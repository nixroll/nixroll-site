import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import styles from "./Nav.module.css";

export function Nav({
  locale,
  active,
}: {
  locale: Locale;
  active: "about" | "work" | "notes";
}) {
  const dict = t(locale);
  const items: { key: "about" | "work" | "notes"; href: string }[] = [
    { key: "about", href: `/${locale}/about` },
    { key: "work", href: `/${locale}/work` },
    { key: "notes", href: `/${locale}/notes` },
  ];

  return (
    <nav className={styles.nav} aria-label={dict.nav.about}>
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={item.key === active ? styles.linkActive : styles.link}
          aria-current={item.key === active ? "page" : undefined}
        >
          {dict.nav[item.key]}
        </Link>
      ))}
    </nav>
  );
}
