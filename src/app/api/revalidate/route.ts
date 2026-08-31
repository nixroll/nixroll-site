import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * ТЗ 7: точечная ревалидация страницы заметок после публикации из бота.
 * Бот — отдельный, более поздний этап; этот роут уже сделан по контракту
 * ТЗ (POST + токен в заголовке), но пока не имеет вызывающей стороны.
 * Токен передаётся через переменную окружения REVALIDATE_TOKEN и никогда
 * не коммитится в репозиторий.
 */
export async function POST(request: NextRequest) {
  const token = request.headers.get("x-revalidate-token");
  const expected = process.env.REVALIDATE_TOKEN;

  if (!expected) {
    return NextResponse.json(
      { error: "REVALIDATE_TOKEN is not configured" },
      { status: 501 }
    );
  }

  if (!token || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/en/notes");
  revalidatePath("/ru/notes");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
