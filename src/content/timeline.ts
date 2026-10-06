/**
 * Таймлайн — обратный хронологический список «год + описание». Контент
 * скопирован из ТЗ дословно (claude/site-tz-minimal-redesign.md), ссылки на
 * компании получены от Никиты напрямую. Школа/универ/переезд/рождение —
 * намеренно без ссылок.
 *
 * Перенос строк: `lead` — обычный текст, может переноситься как угодно.
 * `glued` — предлог + место/компания; элементы между собой и внутри
 * (у многословных названий вроде "Appgile SL") склеены неразрывными
 * пробелами (см. joinNbsp в Timeline.tsx), чтобы "at" никогда не отрывался
 * от компании и "Appgile" от "SL" — ровно так, как в макете Figma.
 */
export type TimelineGluedPart = { text: string; href?: string };

export type TimelineItem = {
  year: string;
  lead?: string;
  glued: TimelineGluedPart[];
};

export const timeline: TimelineItem[] = [
  {
    year: "now",
    lead: "product manager",
    glued: [{ text: "at" }, { text: "RocketData", href: "https://rocketdata.ru" }],
  },
  {
    year: "2023",
    lead: "product manager",
    glued: [{ text: "at" }, { text: "SRG+", href: "https://apps.apple.com/us/app/srg/id6499464148" }],
  },
  {
    year: "2022",
    lead: "project manager",
    glued: [{ text: "at" }, { text: "SCS", href: "https://creatorstudios.io" }],
  },
  {
    year: "2020",
    lead: "project manager",
    glued: [{ text: "at" }, { text: "Appgile SL", href: "https://appgile.com" }],
  },
  {
    year: "2019",
    lead: "design",
    glued: [{ text: "at" }, { text: "Appgile SL", href: "https://appgile.com" }],
  },
  {
    year: "2019",
    lead: "graduation",
    glued: [{ text: "from" }, { text: "BSU" }],
  },
  {
    year: "2016",
    lead: "design",
    glued: [{ text: "at" }, { text: "UC" }],
  },
  {
    year: "2014",
    glued: [{ text: "finished school" }],
  },
  {
    year: "2006",
    lead: "moved",
    glued: [{ text: "to" }, { text: "Minsk" }],
  },
  {
    year: "1996",
    glued: [{ text: "b. Oshmyany" }],
  },
];
