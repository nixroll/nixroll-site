import { footerContent } from "@/content/footer";
import { formatBuildDate, getBuildDate } from "@/lib/build-date";
import styles from "./Footer.module.css";

export function Footer() {
  const updated = formatBuildDate(getBuildDate());

  return (
    <div className={styles.footer}>
      <div className={styles.contactAndDate}>
        <p className={styles.line}>
          say hi{" "}
          <a
            href={footerContent.telegram.href}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.link}
          >
            {footerContent.telegram.label}
          </a>{" "}
          or{" "}
          <a href={footerContent.email.href} className={styles.link}>
            {footerContent.email.label}
          </a>
        </p>
        <p className={styles.line}>updated {updated}</p>
      </div>
      <p className={styles.line}>{footerContent.location}</p>
    </div>
  );
}
