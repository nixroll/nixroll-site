import { PageShell } from "@/components/PageShell";
import { Profile } from "@/components/Profile";
import { Nav } from "@/components/Nav";
import { AboutBody } from "@/components/AboutBody";
import { Connect } from "@/components/Connect";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { slotAfter } from "@/lib/reveal";
import { about } from "@/content/about";
import { CONNECT_ORDER } from "@/content/profile";

export function AboutSection({ locale }: { locale: Locale }) {
  // Хвост очереди появления: последний абзац текста и последняя строка
  // контактов. Переключатель языка встаёт на шаг позже обоих.
  const languageSlot = slotAfter(
    about[locale].paragraphs.length - 1,
    1 + CONNECT_ORDER.length // секция контактов идёт второй, в ней подпись + ссылки
  );

  return (
    <PageShell>
      <Profile locale={locale} />
      <Nav locale={locale} active="about" />
      <AboutBody locale={locale} />
      <Connect locale={locale} />
      <LanguageSwitcher locale={locale} section="about" slot={languageSlot} />
    </PageShell>
  );
}
