import { about } from "@/content/about";
import { applyRuTypography } from "@/lib/typography";
import type { Locale } from "@/lib/i18n";
import styles from "./AboutBody.module.css";

export function AboutBody({ locale }: { locale: Locale }) {
  const paragraphs = about[locale].paragraphs;
  return (
    <div className={styles.body}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {locale === "ru" ? applyRuTypography(paragraph) : paragraph}
        </p>
      ))}
    </div>
  );
}
