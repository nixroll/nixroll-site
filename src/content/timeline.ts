/**
 * Таймлайн — обратный хронологический список «год + описание». Контент
 * скопирован из ТЗ дословно (claude/site-tz-minimal-redesign.md), ссылки на
 * компании получены от Никиты напрямую. Школа/универ/переезд/рождение —
 * намеренно без ссылок.
 */
export type TimelineItem = {
  year: string;
  before: string;
  company?: { name: string; href: string };
};

export const timeline: TimelineItem[] = [
  {
    year: "now",
    before: "product manager at ",
    company: { name: "RocketData", href: "https://rocketdata.ru" },
  },
  {
    year: "2022",
    before: "product manager at ",
    company: { name: "SRG+", href: "https://srgplus.app" },
  },
  {
    year: "2022",
    before: "project manager at ",
    company: { name: "SCS", href: "https://creatorstudios.io" },
  },
  {
    year: "2020",
    before: "project manager at ",
    company: { name: "Appgile SL", href: "https://appgile.com" },
  },
  {
    year: "2019",
    before: "design at ",
    company: { name: "Appgile SL", href: "https://appgile.com" },
  },
  { year: "2019", before: "graduation from BSU" },
  { year: "2016", before: "design at UC" },
  { year: "2014", before: "finished school" },
  { year: "2006", before: "moved to Minsk" },
  { year: "1996", before: "b. Oshmyany" },
];
