import type { WorkRow as WorkRowType } from "@/content/work";
import type { Locale } from "@/lib/i18n";
import styles from "./WorkRow.module.css";

/**
 * Тексты выводятся как есть: расстановка неразрывных пробелов зафиксирована
 * в ТЗ (ровно 35 на русской странице), поэтому applyRuTypography здесь не
 * применяется. Автоматика добавила бы лишние — в том числе внутри дат
 * «2022 - сейчас», где по ТЗ нужен обычный дефис с пробелами.
 */
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
        <p className={styles.role}>{row.role[locale]}</p>
      </div>
      {row.isEducation ? (
        <p className={styles.paragraph}>{bullets[0]}</p>
      ) : (
        <ul className={styles.bullets}>
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
      <p className={styles.meta}>{row.meta[locale]}</p>
    </div>
  );
}
