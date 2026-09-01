import { about } from "@/content/about";
import type { Locale } from "@/lib/i18n";
import styles from "./AboutBody.module.css";

/**
 * Текст «О себе». Абзацы берутся из контента как есть: расстановка
 * неразрывных пробелов зафиксирована в ТЗ, поэтому applyRuTypography здесь
 * не применяется — автоматика добавила бы лишние (см. комментарий в
 * src/content/about.ts).
 *
 * Внутри абзаца может быть ссылка (ТЗ 2.2: единственная — «SRG Plus»).
 * Неразрывный пробел перед ней лежит в предыдущем куске текста, снаружи
 * тега, — иначе он попал бы внутрь якоря и подчеркнулся вместе с ним.
 */
export function AboutBody({ locale }: { locale: Locale }) {
  return (
    <div className={styles.body}>
      {about[locale].paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {paragraph.map((segment, part) =>
            typeof segment === "string" ? (
              segment
            ) : (
              <a
                key={part}
                href={segment.href}
                className={styles.link}
                target="_blank"
                rel="noopener"
              >
                {segment.text}
              </a>
            )
          )}
        </p>
      ))}
    </div>
  );
}
