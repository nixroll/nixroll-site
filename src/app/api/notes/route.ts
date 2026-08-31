import { NextRequest, NextResponse } from "next/server";
import { getNotesPage } from "@/lib/notes";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { localizeNote } from "@/lib/notes";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const localeParam = searchParams.get("locale") ?? DEFAULT_LOCALE;
  const locale = isLocale(localeParam) ? localeParam : DEFAULT_LOCALE;

  const offsetParam = Number(searchParams.get("offset") ?? "0");
  const limitParam = Number(searchParams.get("limit") ?? "10");

  const offset = Number.isFinite(offsetParam) && offsetParam >= 0 ? offsetParam : 0;
  const limit =
    Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 50) : 10;

  const page = await getNotesPage(offset, limit);

  return NextResponse.json({
    items: page.items.map((note) => localizeNote(note, locale)),
    total: page.total,
    remaining: page.remaining,
  });
}
