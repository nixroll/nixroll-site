"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageShell.module.css";

/**
 * Обёртка страницы. Ключ по текущему пути заставляет React пересоздать
 * контейнер при переходе между разделами — за счёт этого CSS-анимация
 * появления запускается заново на каждой странице (сама анимация описана
 * в PageShell.module.css). Разметка при этом не меняется: никаких
 * дополнительных обёрток вокруг блоков не добавляется.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.page}>
      <div key={pathname} className={styles.container}>
        {children}
      </div>
    </div>
  );
}
