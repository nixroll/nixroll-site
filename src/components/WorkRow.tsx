import type { WorkRow as WorkRowType } from "@/content/work";
import { applyRuTypography } from "@/lib/typography";
import type { Locale } from "@/lib/i18n";
import styles from "./WorkRow.module.css";

function tx(text: string, locale: Locale) {
  return locale === "ru" ? applyRuTypography(text) : text;
}

export function WorkRow({
  row,
  locale,
}: {
  row: WorkRowType;
  locale: Locale;
}) {
  const bullets = row.bullets[locale];

  return (
    /* data-reveal: части строки появляются отдельными стартами (см. PageShell.module.css) */
    <div className={styles.row} data-reveal>
      <div className={styles.nameRole}>
        <p className={styles.name}>{row.name[locale]}</p>
        <p className={styles.role}>{tx(row.role[locale], locale)}</p>
      </div>
      {row.isEducation ? (
        <p className={styles.paragraph}>{tx(bullets[0], locale)}</p>
      ) : (
        <ul className={styles.bullets}>
          {bullets.map((bullet, index) => (
            <li key={index}>{tx(bullet, locale)}</li>
          ))}
        </ul>
      )}
      <p className={styles.meta}>{tx(row.meta[locale], locale)}</p>
    </div>
  );
}
