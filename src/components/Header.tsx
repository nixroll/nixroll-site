import Image from "next/image";
import { profile } from "@/content/profile";
import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.avatar}>
        <Image
          src={profile.avatar.src}
          alt={profile.avatar.alt}
          width={128}
          height={128}
          className={styles.avatarImg}
          priority
        />
      </div>
      <div className={styles.identity}>
        <p className={styles.name}>{profile.name}</p>
        <p className={styles.role}>{profile.role}</p>
      </div>
    </div>
  );
}
