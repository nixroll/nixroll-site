import type { Env, Note } from "./types";

const GH_API = "https://api.github.com";

function ghHeaders(env: Env) {
  return {
    authorization: `Bearer ${env.GITHUB_TOKEN}`,
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "user-agent": "nixroll-notes-bot",
  };
}

async function ghJson<T>(env: Env, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${GH_API}${path}`, {
    ...init,
    headers: { ...ghHeaders(env), ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${path} failed: ${res.status} ${body}`);
  }
  return res.json() as Promise<T>;
}

/** Base64 без разворачивания всего файла в один огромный String.fromCharCode(...arr). */
function bytesToBase64(bytes: Uint8Array): string {
  const CHUNK = 8192;
  let binary = "";
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

async function getCurrentNotes(env: Env): Promise<Note[]> {
  const res = await ghJson<{ content: string }>(
    env,
    `/repos/${env.GITHUB_REPO}/contents/src/content/notes-data.json?ref=${env.GITHUB_BRANCH}`
  );
  const json = atob(res.content.replace(/\n/g, ""));
  return JSON.parse(json) as Note[];
}

/** a-b-c из произвольного текста; пусто/только цифры — на всякий случай добавляем note-. */
export function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return slug || `note-${Date.now()}`;
}

function uniqueSlug(base: string, existing: Note[]): string {
  const taken = new Set(existing.map((n) => n.slug));
  if (!taken.has(base)) return base;
  let i = 2;
  while (taken.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

export type PublishInput = {
  ru: { title: string; body: string[] };
  en: { title: string; body: string[] };
  photo?: { bytes: Uint8Array; width: number; height: number } | null;
};

/**
 * Публикует заметку одним атомарным коммитом в master (Git Data API):
 * обновляет notes-data.json и, если есть фото, кладёт его в
 * public/images/notes/<slug>.jpg — оба файла одним коммитом, одним
 * пушем, чтобы автодеплой (.github/workflows/deploy.yml) отработал
 * один раз на цельное изменение.
 */
export async function publishNote(
  env: Env,
  input: PublishInput
): Promise<{ slug: string; commitUrl: string }> {
  const { owner, repo } = splitRepo(env.GITHUB_REPO);
  const branch = env.GITHUB_BRANCH;

  const currentNotes = await getCurrentNotes(env);
  const slug = uniqueSlug(slugify(input.en.title), currentNotes);
  const publishedAt = new Date().toISOString().slice(0, 10);

  const note: Note = {
    id: slug,
    slug,
    status: "published",
    publishedAt,
    ru: input.ru,
    en: input.en,
  };

  let imagePath: string | null = null;
  if (input.photo) {
    imagePath = `public/images/notes/${slug}.jpg`;
    note.image = {
      url: `/images/notes/${slug}.jpg`,
      width: input.photo.width,
      height: input.photo.height,
      altRu: input.ru.title,
      altEn: input.en.title,
    };
  }

  // Новые заметки — в начало массива (сайт и так сортирует по дате, но так
  // файл читается человеком сверху вниз в порядке публикации).
  const updatedNotes = [note, ...currentNotes];

  // 1. Текущий указатель ветки.
  const ref = await ghJson<{ object: { sha: string } }>(
    env,
    `/repos/${owner}/${repo}/git/ref/heads/${branch}`
  );
  const parentCommitSha = ref.object.sha;

  // 2. Дерево этого коммита (нужно как base_tree).
  const parentCommit = await ghJson<{ tree: { sha: string } }>(
    env,
    `/repos/${owner}/${repo}/git/commits/${parentCommitSha}`
  );

  // 3. Blob с обновлённым JSON.
  const jsonBlob = await ghJson<{ sha: string }>(
    env,
    `/repos/${owner}/${repo}/git/blobs`,
    {
      method: "POST",
      body: JSON.stringify({
        content: JSON.stringify(updatedNotes, null, 2) + "\n",
        encoding: "utf-8",
      }),
    }
  );

  const treeEntries: {
    path: string;
    mode: "100644";
    type: "blob";
    sha: string;
  }[] = [
    {
      path: "src/content/notes-data.json",
      mode: "100644",
      type: "blob",
      sha: jsonBlob.sha,
    },
  ];

  // 4. Blob с фото (если есть).
  if (input.photo && imagePath) {
    const imageBlob = await ghJson<{ sha: string }>(
      env,
      `/repos/${owner}/${repo}/git/blobs`,
      {
        method: "POST",
        body: JSON.stringify({
          content: bytesToBase64(input.photo.bytes),
          encoding: "base64",
        }),
      }
    );
    treeEntries.push({
      path: imagePath,
      mode: "100644",
      type: "blob",
      sha: imageBlob.sha,
    });
  }

  // 5. Новое дерево поверх текущего (меняются только затронутые пути).
  const newTree = await ghJson<{ sha: string }>(
    env,
    `/repos/${owner}/${repo}/git/trees`,
    {
      method: "POST",
      body: JSON.stringify({
        base_tree: parentCommit.tree.sha,
        tree: treeEntries,
      }),
    }
  );

  // 6. Коммит.
  const commitMessage = `Заметка: ${input.ru.title}\n\nЧерез Telegram-бота.`;
  const newCommit = await ghJson<{ sha: string; html_url: string }>(
    env,
    `/repos/${owner}/${repo}/git/commits`,
    {
      method: "POST",
      body: JSON.stringify({
        message: commitMessage,
        tree: newTree.sha,
        parents: [parentCommitSha],
      }),
    }
  );

  // 7. Двигаем ветку на новый коммит.
  await ghJson(env, `/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: newCommit.sha }),
  });

  return { slug, commitUrl: newCommit.html_url };
}

function splitRepo(repo: string): { owner: string; repo: string } {
  const [owner, name] = repo.split("/");
  return { owner, repo: name };
}
