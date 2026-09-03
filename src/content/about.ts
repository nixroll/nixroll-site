/**
 * Текст страницы «О себе». Согласован с заказчиком построчно — формулировки
 * не правятся (ТЗ «Страница «Работа» и «О себе» на nixroll.co — финальные
 * тексты, версия 4», 3 сентября 2026). Версия 4 отменяет версию 3: должность
 * теперь Product Manager (было — натянутый Product Lead), срок стажа убран
 * из первого предложения.
 *
 * Неразрывные пробелы записаны escape-последовательностью \u00A0, а не самим
 * символом: он невидим и при копировании через редакторы, мессенджеры и буфер
 * обмена молча превращается в обычный пробел. В таком виде потеря сразу видна
 * в исходнике. По этой же причине текст «О себе» не прогоняется через
 * applyRuTypography: расстановка здесь зафиксирована ТЗ — ровно 18 пробелов,
 * 4 + 9 + 5 по абзацам, — а автоматика могла бы добавить лишние.
 *
 * Правило ТЗ: связываются только односимвольные слова (я, в, с, и, а, к, о,
 * у). Двухбуквенные предлоги (до, на, от, из, по, за) намеренно НЕ
 * связываются — на колонке 320px это давало слишком рваный правый край.
 *
 * Файл собран скриптом, чтобы неразрывные пробелы нельзя было потерять при
 * ручном наборе. Правки вносить прямо здесь.
 */

/** Кусок абзаца: обычный текст или ссылка внутри него. */
export type AboutSegment = string | { text: string; href: string };

/** Единственная ссылка внутри текста «О себе» (ТЗ 2.2). */
const SRG_PLUS = { text: "SRG Plus", href: "https://srgplus.app/" };

export const about: Record<"en" | "ru", { paragraphs: AboutSegment[][] }> = {
  en: {
    // Неразрывные пробелы в английской версии не используются: в английской
    // типографике предлог в конце строки допустим.
    paragraphs: [
      [
        "I am a Product Manager. I run the development team at ",
        SRG_PLUS,
        " and build the company’s product strategy and its systems for managing teams.",
      ],
      [
        "My interest lies in technology and engineering culture, in how an idea becomes a system people rely on every day. I am equally interested in launching products from zero and in reshaping ones that already run: in both cases the task is the same, taking the product to a measurable result. Most of my attention goes to how a team is set up and how decisions are made inside it.",
      ],
      [
        "What interests me is the intersection of technology and finance in modern digital products, and I am looking at product roles in a large technology or financial company.",
      ],
    ],
  },
  ru: {
    paragraphs: [
      [
        "Я\u00A0Product Manager. Руковожу командой разработки в\u00A0",
        SRG_PLUS,
        " и\u00A0выстраиваю внутри компании продуктовую стратегию и\u00A0систему управления командами.",
      ],
      [
        "Мой интерес лежит в\u00A0технологиях и\u00A0инженерной культуре, в\u00A0том, как замысел становится системой, которой пользуются каждый день. Мне одинаково интересно запускать продукты с\u00A0нуля и\u00A0перестраивать те, что уже работают: в\u00A0обоих случаях задача одна, довести продукт до измеримого результата. Больше всего внимания я\u00A0уделяю тому, как устроена команда и\u00A0как в\u00A0ней принимаются решения.",
      ],
      [
        "Мне интересно пересечение технологий и\u00A0финансов в\u00A0современных цифровых продуктах, и\u00A0я\u00A0рассматриваю развитие продукта в\u00A0крупной технологической или финансовой компании.",
      ],
    ],
  },
};
