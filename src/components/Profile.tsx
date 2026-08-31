import Image from "next/image";
import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import styles from "./Profile.module.css";

export function Profile({ locale }: { locale: Locale }) {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Image
          src={profile.avatar.src}
          alt={profile.avatar.alt[locale]}
          width={135}
          height={90}
          className={styles.avatarImg}
          priority
        />
      </div>
      <div className={styles.nameEmail}>
        <p className={styles.name}>{profile.name[locale]}</p>
        <p className={styles.email}>{profile.email}</p>
      </div>
    </div>
  );
}
