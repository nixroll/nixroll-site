const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

/** Формат из макета: "oct 2, 2026" — месяц в три буквы нижним регистром,
 * день без ведущего нуля, запятая, год полностью. */
export function formatBuildDate(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

/**
 * Дата последнего деплоя — автоматическая (решение Никиты, см. ТЗ).
 * deploy.yml прокидывает NEXT_PUBLIC_BUILD_DATE в момент сборки (UTC,
 * YYYY-MM-DD); при локальной разработке переменной нет, тогда берём
 * текущую дату — для dev-превью это ожидаемо и безопасно.
 */
export function getBuildDate(): Date {
  const raw = process.env.NEXT_PUBLIC_BUILD_DATE;
  if (raw) {
    const parsed = new Date(`${raw}T00:00:00Z`);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}
