import { NextRequest, NextResponse } from "next/server";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const COOKIE = "nixroll_locale";
const ONE_YEAR = 60 * 60 * 24 * 365;

function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const header = request.headers.get("accept-language");
  if (header) {
    const langs = header
      .split(",")
      .map((entry) => entry.split(";")[0].trim().toLowerCase());
    for (const lang of langs) {
      if (lang.startsWith("ru")) return "ru";
      if (lang.startsWith("en")) return "en";
    }
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const [first] = segments;

  // "/" — определяем язык по cookie, затем по Accept-Language.
  if (pathname === "/") {
    const locale = resolveLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/about`;
    const response = NextResponse.redirect(url);
    response.cookies.set(COOKIE, locale, { maxAge: ONE_YEAR, path: "/" });
    return response;
  }

  // "/en" или "/ru" без раздела — ведём на About.
  if (isLocale(first) && segments.length === 1) {
    const url = request.nextUrl.clone();
    url.pathname = `/${first}/about`;
    return NextResponse.redirect(url);
  }

  // Любой валидный локализованный путь — запоминаем выбор языка.
  if (isLocale(first)) {
    const response = NextResponse.next();
    response.cookies.set(COOKIE, first, { maxAge: ONE_YEAR, path: "/" });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
