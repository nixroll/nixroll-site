import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import styles from "./Nav.module.css";

/**
 * Переключатель языка сохраняет текущий раздел (about/work/notes) при
 * переходе, чтобы человек не терял место на сайте (ТЗ: язык должен
 * сохраняться при навигации).
 */
export function LanguageSwitcher({
  locale,
  section,
}: {
  locale: Locale;
  section: "about" | "work" | "notes";
}) {
  const dict = t(locale);
  const other: Locale = locale === "en" ? "ru" : "en";

  return (
    <div className={styles.nav}>
      <Link
        href={`/en/${section}`}
        className={locale === "en" ? styles.linkActive : styles.link}
        aria-current={locale === "en" ? "page" : undefined}
        hrefLang="en"
      >
        {dict.lang.en}
      </Link>
      <Link
        href={`/ru/${section}`}
        className={locale === "ru" ? styles.linkActive : styles.link}
        aria-current={locale === "ru" ? "page" : undefined}
        hrefLang="ru"
      >
        {dict.lang.ru}
      </Link>
      <span hidden>{other}</span>
    </div>
  );
}
