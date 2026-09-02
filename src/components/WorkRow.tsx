import { Fragment } from "react";
import type { WorkRow as WorkRowType } from "@/content/work";
import type { Locale } from "@/lib/i18n";
import styles from "./WorkRow.module.css";

/**
 * Тексты выводятся как есть: расстановка неразрывных пробелов зафиксирована
 * в ТЗ (ровно 50 на русской странице), поэтому applyRuTypography здесь не
 * применяется. Автоматика добавила бы лишние — в том числе внутри дат
 * «2022 - сейчас», где по ТЗ нужен обычный дефис с пробелами.
 */

/**
 * Строка локации: «Город, Страна · Формат · Годы». Каждый пункт — своя
 * неразрывная единица вместе с разделительной точкой слева (кроме первого,
 * у него точки нет): если пункт целиком не влезает на строку, переносится
 * он сам вместе со своей точкой, а не рвётся посередине. Реализовано через
 * CSS `white-space: nowrap` на span, а не вставкой неразрывных пробелов —
 * иначе они попали бы в счёт символов с кодом 160 на русской странице,
 * который ТЗ фиксирует ровно в 50.
 */
function MetaLine({ text }: { text: string }) {
  const parts = text.split(" · ");
  return (
    <>
      <span className={styles.metaPart}>{parts[0]}</span>
      {parts.slice(1).map((part, index) => (
        // Пробел перед точкой — отдельный текстовый узел вне nowrap-спана:
        // именно он остаётся точкой переноса. Точка и текст внутри спана
        // склеены и на две строки не разъедутся.
        <Fragment key={index}>
          {" "}
          <span className={styles.metaPart}>{`· ${part}`}</span>
        </Fragment>
      ))}
    </>
  );
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
      <p className={styles.meta}>
        <MetaLine text={row.meta[locale]} />
      </p>
    </div>
  );
}
