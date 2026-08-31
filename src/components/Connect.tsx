import { profile } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";
import styles from "./Connect.module.css";

export function Connect({ locale }: { locale: Locale }) {
  const dict = t(locale);
  return (
    <div className={styles.connect}>
      <p className={styles.label}>{dict.connectLabel}</p>
      <a className={styles.link} href={profile.connect.email}>
        {dict.connect.email}
      </a>
      <a
        className={styles.link}
        href={profile.connect.twitter}
        target="_blank"
        rel="noreferrer noopener"
      >
        {dict.connect.twitter}
      </a>
      <a
        className={styles.link}
        href={profile.connect.linkedin}
        target="_blank"
        rel="noreferrer noopener"
      >
        {dict.connect.linkedin}
      </a>
    </div>
  );
}
