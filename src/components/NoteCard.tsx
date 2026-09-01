import Image from "next/image";
import type { LocalizedNote } from "@/lib/notes";
import styles from "./NoteCard.module.css";

function renderParagraph(
  text: string,
  links: { label: string; href: string }[] | undefined,
  isFirst: boolean
) {
  if (!isFirst || !links || links.length === 0) {
    return text;
  }

  // Первая ссылка из links встраивается в начало первого абзаца, как в
  // макете (например, «Apple обновила Mac mini...»).
  const [firstLink] = links;
  if (!text.startsWith(firstLink.label)) {
    return text;
  }
  const rest = text.slice(firstLink.label.length);
  return (
    <>
      <a
        href={firstLink.href}
        target="_blank"
        rel="noreferrer noopener"
        className={styles.link}
      >
        {firstLink.label}
      </a>
      {rest}
    </>
  );
}

export function NoteCard({
  note,
  priorityImage = false,
}: {
  note: LocalizedNote;
  priorityImage?: boolean;
}) {
  return (
    /* data-reveal: текстовый блок и обложка, а внутри блока заголовок и
       текст, появляются отдельными стартами (см. PageShell.module.css) */
    <article className={styles.note} data-reveal>
      <div className={styles.content} data-reveal>
        <div className={styles.header}>
          <p className={styles.title}>{note.title}</p>
          <p className={styles.date}>{note.dateLabel}</p>
        </div>
        <div className={styles.body}>
          {note.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {renderParagraph(paragraph, note.links, index === 0)}
            </p>
          ))}
        </div>
      </div>
      {note.image ? (
        <div className={styles.imageWrap}>
          <Image
            src={note.image.url}
            alt={note.image.alt}
            fill
            sizes="(max-width: 720px) 100vw, 656px"
            className={styles.image}
            loading={priorityImage ? undefined : "lazy"}
            priority={priorityImage}
          />
        </div>
      ) : null}
    </article>
  );
}
