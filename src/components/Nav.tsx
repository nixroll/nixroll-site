import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { SECTIONS, href, type Section } from "@/lib/routes";
import styles from "./Nav.module.css";

export function Nav({ locale, active }: { locale: Locale; active: Section }) {
  const dict = t(locale);

  return (
    <nav className={styles.nav} aria-label={dict.nav.about}>
      {SECTIONS.map((section) => (
        <Link
          key={section}
          href={href(locale, section)}
          className={section === active ? styles.linkActive : styles.link}
          aria-current={section === active ? "page" : undefined}
        >
          {dict.nav[section]}
        </Link>
      ))}
    </nav>
  );
}
