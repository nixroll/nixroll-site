import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import styles from "./LanguageSwitcher.module.css";

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
  return (
    <div className={styles.switcher}>
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
    </div>
  );
}
