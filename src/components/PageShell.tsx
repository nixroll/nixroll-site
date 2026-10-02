import type { ReactNode } from "react";
import styles from "./PageShell.module.css";

/**
 * Обёртка страницы: центрирует контент и даёт контейнеру, чьи прямые
 * дети (header / content / divider / footer) и их собственные дети
 * проявляются каскадом при монтировании — см. PageShell.module.css.
 * Страница теперь одна-единственная, поэтому никакого key-по-пути больше
 * не нужно: анимация и так проигрывается один раз при заходе на сайт.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
