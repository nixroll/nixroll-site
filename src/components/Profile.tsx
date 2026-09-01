import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import styles from "./Profile.module.css";

export function Profile({ locale }: { locale: Locale }) {
  const dict = t(locale);

  return (
    <div className={styles.profile}>
      {/* Фотография ведёт на главную — то есть на About текущего языка. */}
      <Link
        href={href(locale, "about")}
        className={styles.avatar}
        aria-label={dict.homeLink}
      >
        <Image
          src={profile.avatar.src}
          alt={profile.avatar.alt[locale]}
          width={135}
          height={90}
          className={styles.avatarImg}
          priority
        />
      </Link>
      <div className={styles.nameEmail}>
        <p className={styles.name}>{profile.name[locale]}</p>
        <p className={styles.email}>{profile.email}</p>
      </div>
    </div>
  );
}
