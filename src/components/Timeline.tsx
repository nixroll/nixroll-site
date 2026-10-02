import { timeline } from "@/content/timeline";
import styles from "./Timeline.module.css";

export function Timeline() {
  return (
    <div className={styles.content}>
      {timeline.map((item) => (
        <div className={styles.row} key={`${item.year}-${item.before}`}>
          <p className={styles.year}>{item.year}</p>
          <p className={styles.description}>
            {item.before}
            {item.company ? (
              <a
                href={item.company.href}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.link}
              >
                {item.company.name}
              </a>
            ) : null}
          </p>
        </div>
      ))}
    </div>
  );
}
