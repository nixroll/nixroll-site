import { CONNECT_ORDER, connectHref } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";
import styles from "./Connect.module.css";

export function Connect({ locale }: { locale: Locale }) {
  const dict = t(locale);

  return (
    <div className={styles.connect}>
      <p className={styles.label}>{dict.connectLabel}</p>
      {CONNECT_ORDER.map((key) => {
        const href = connectHref(key, locale);
        // Почта открывается в почтовом клиенте, остальное — в новой вкладке
        // (резюме теперь тоже: ссылка ведёт на Google Drive).
        const external = key !== "email";
        return (
          <a
            key={key}
            className={styles.link}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
          >
            {dict.connect[key]}
          </a>
        );
      })}
    </div>
  );
}
