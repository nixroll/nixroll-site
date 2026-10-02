import { Fragment } from "react";
import { timeline, type TimelineGluedPart } from "@/content/timeline";
import styles from "./Timeline.module.css";

/** Заменяет обычные пробелы на неразрывные — чтобы текст не рвался
 * посередине там, где это выглядит плохо (см. комментарий в timeline.ts). */
function joinNbsp(text: string): string {
  return text.replace(/ /g, " ");
}

export function Timeline() {
  return (
    <div className={styles.content}>
      {timeline.map((item) => (
        <div className={styles.row} key={`${item.year}-${item.lead ?? item.glued[0].text}`}>
          <p className={styles.year}>{item.year}</p>
          <p className={styles.description}>
            {item.lead ? `${item.lead} ` : null}
            {item.glued.map((part: TimelineGluedPart, index: number) => (
              <Fragment key={part.text}>
                {index > 0 ? " " : null}
                {part.href ? (
                  <a
                    href={part.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.link}
                  >
                    {joinNbsp(part.text)}
                  </a>
                ) : (
                  joinNbsp(part.text)
                )}
              </Fragment>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
