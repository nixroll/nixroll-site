import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.row}>
        <p className={styles.code}>404</p>
        <p className={styles.message}>
          This page could not be found. <Link href="/" className={styles.link}>Back to nixroll.co</Link>
        </p>
      </div>
    </div>
  );
}
