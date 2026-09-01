import Link from "next/link";
import type { CSSProperties } from "react";
import { t, type Locale } from "@/lib/i18n";
import { href, type Section } from "@/lib/routes";
import styles from "./LanguageSwitcher.module.css";

/**
 * Переключатель языка сохраняет текущий раздел (about/work/notes) при
 * переходе, чтобы человек не терял место на сайте (ТЗ: язык должен
 * сохраняться при навигации).
 *
 * `slot` — номер в очереди появления. Переключатель идёт последним, уже
 * после всех строк предыдущей секции, поэтому страница передаёт сюда
 * посчитанный номер (см. src/lib/reveal.ts). Оба языка при этом
 * появляются одновременно, а не друг за другом.
 */
export function LanguageSwitcher({
  locale,
  section,
  slot,
}: {
  locale: Locale;
  section: Section;
  slot?: number;
}) {
  const dict = t(locale);
  const style =
    slot === undefined ? undefined : ({ "--index-1": slot } as CSSProperties);

  return (
    <div className={styles.switcher} style={style}>
      <Link
        href={href("en", section)}
        className={locale === "en" ? styles.linkActive : styles.link}
        aria-current={locale === "en" ? "page" : undefined}
        hrefLang="en"
        data-reveal-index="0"
      >
        {dict.lang.en}
      </Link>
      <Link
        href={href("ru", section)}
        className={locale === "ru" ? styles.linkActive : styles.link}
        aria-current={locale === "ru" ? "page" : undefined}
        hrefLang="ru"
        data-reveal-index="0"
      >
        {dict.lang.ru}
      </Link>
    </div>
  );
}
