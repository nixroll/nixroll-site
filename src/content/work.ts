/**
 * Содержимое страницы «Работа». Тексты согласованы и приведены дословно по ТЗ
 * «Страница „Работа“ / Work: полные тексты, версия 3» от 1 сентября 2026.
 * Править, сокращать, переставлять и дополнять их нельзя.
 *
 * Неразрывные пробелы записаны escape-последовательностью \u00A0: сам символ
 * невидим и при копировании молча превращается в обычный пробел. На русской
 * версии их ровно 50 — 9 + 10 + 14 + 10 + 4 + 3 по блокам. По этой же причине
 * тексты не прогоняются через applyRuTypography: расстановка зафиксирована
 * ТЗ, автоматика добавила бы лишние (в том числе внутри дат «2022 - сейчас»).
 *
 * Правило здесь ШИРЕ, чем на странице «О себе», и это намеренно. Связываются
 * односимвольные слова (я, в, с, и, а, к, о, у), двухбуквенные предлоги и
 * частицы (на, до, из, по, за, от, во, со, об, не) и разряды внутри чисел
 * (50 000). На «О себе» колонка на мобильном 256px, и связывание
 * двухбуквенных предлогов рвало правый край; здесь колонка шире и эта цена не
 * платится. Приводить страницы к общему знаменателю не нужно.
 *
 * Аббревиатуры из заглавных букв под правило не подпадают: «операционного ПО
 * для банковской системы» остаётся с обычным пробелом — «ПО» это не предлог.
 *
 * Даты: диапазон оформляется дефисом с пробелами, короткое тире не
 * подставляется. У Kinez один год без диапазона — это не опечатка.
 * Числа по нормам своего языка: 50 000 в русской версии, 50,000 в английской.
 *
 * Файл собран скриптом, чтобы неразрывные пробелы нельзя было потерять при
 * ручном наборе. Правки вносить прямо здесь.
 */

export type WorkRow = {
  name: { en: string; ru: string };
  role: { en: string; ru: string };
  bullets: { en: string[]; ru: string[] };
  meta: { en: string; ru: string };
  /** У блока об образовании вместо трёх буллетов один абзац. */
  isEducation?: boolean;
};

export const work: WorkRow[] = [
  {
    name: { en: "SRG Plus", ru: "SRG Plus" },
    role: {
      en: "Product Lead",
      ru: "Product Lead",
    },
    bullets: {
      en: [
        "Took a new SaaS content management product to market: a cross-platform application and a web version, with the team and the development process built from scratch.",
        "Reached 50 corporate clients on paid subscriptions within the first year of launch, opening the product’s first revenue stream.",
        "Own the product end to end: strategy and development priorities, product metrics, team composition and process, the release cycle and subscription economics.",
      ],
      ru: [
        "Вывод на\u00A0рынок нового SaaS-продукта для управления контентом: кроссплатформенное приложение и\u00A0веб-версия, собственная команда и\u00A0выстроенный процесс разработки.",
        "Привлечение 50 корпоративных клиентов на\u00A0платной подписке за\u00A0первый год после запуска, первая выручка продукта.",
        "Полная ответственность за\u00A0продукт: стратегия и\u00A0приоритеты развития, продуктовые метрики, состав и\u00A0процессы команды, релизный цикл и\u00A0экономика подписки.",
      ],
    },
    meta: {
      en: "Los Angeles, United States · Remote · 2022 - now",
      ru: "Лос-Анджелес, США · Удалённо · 2022 - сейчас",
    },
  },
  {
    name: { en: "Serge Creator Studios", ru: "Serge Creator Studios" },
    role: {
      en: "Project Manager → Product Lead",
      ru: "Project Manager → Product Lead",
    },
    bullets: {
      en: [
        "Led the development team and a portfolio of five client products, each with its own development cycle and release schedule.",
        "Introduced quality control systems across the studio’s delivery process, growing average client retention from one year to two.",
        "Launched and led SRG Plus, a product incubated inside the studio, moving the company from client services into its own product.",
      ],
      ru: [
        "Управление командой разработки и\u00A0портфелем из\u00A0пяти клиентских продуктов, каждый с\u00A0собственным циклом разработки и\u00A0графиком релизов.",
        "Внедрение систем контроля качества в\u00A0процессы студии: средний срок удержания клиента вырос с\u00A0года до\u00A0двух.",
        "Запуск и\u00A0руководство SRG Plus, продуктом, выросшим внутри студии: переход компании от\u00A0клиентской разработки к\u00A0собственному продукту.",
      ],
    },
    meta: {
      en: "Los Angeles, United States · Remote · 2021 - 2022",
      ru: "Лос-Анджелес, США · Удалённо · 2021 - 2022",
    },
  },
  {
    name: { en: "Kinez", ru: "Kinez" },
    role: {
      en: "Project Manager",
      ru: "Project Manager",
    },
    bullets: {
      en: [
        "Won a competitive tender at a Skolkovo resident company to build a mobile product for controlling a prosthetic knee module.",
        "Launched the application from zero in three months on iOS and Android, took it to public release by month eight and handed the product to the owner.",
        "Ran two teams in two cities in sync: software in Minsk and hardware in Moscow.",
      ],
      ru: [
        "Победа в\u00A0тендере компании-резидента Сколково на\u00A0разработку мобильного продукта для управления коленным модулем протеза.",
        "Запуск приложения с\u00A0нуля за\u00A0три месяца, сразу на\u00A0iOS и\u00A0Android, и\u00A0доведение до\u00A0публичного релиза к\u00A0восьмому месяцу с\u00A0передачей продукта собственнику.",
        "Синхронная организация работы двух команд в\u00A0двух городах: программной в\u00A0Минске и\u00A0аппаратной в\u00A0Москве.",
      ],
    },
    meta: {
      en: "Moscow, Russia · Project · 2021",
      ru: "Москва, Россия · Проект · 2021",
    },
  },
  {
    name: { en: "Appgile SL", ru: "Appgile SL" },
    role: {
      en: "UX/UI Designer → Project Manager",
      ru: "UX/UI Designer → Project Manager",
    },
    bullets: {
      en: [
        "Delivered operational banking software for Banco Santander at a Spanish enterprise software company: joined remotely and relocated to Madrid within three months.",
        "Launched a credit calculator for European car dealers built on Banco Santander’s lending system, a product serving more than 50,000 users.",
        "Moved from design into project management: established business processes and delivery metrics, and ran the product’s integration into partner banks.",
      ],
      ru: [
        "Проектирование и\u00A0разработка операционного ПО для банковской системы Banco Santander в\u00A0испанской ИТ-компании: старт удалённо, переезд в\u00A0Мадрид на\u00A0третий месяц.",
        "Запуск кредитного калькулятора для европейских автодилеров на\u00A0базе кредитной системы Banco Santander, продукта более чем для 50\u00A0000 пользователей.",
        "Переход из\u00A0дизайна в\u00A0проектное управление: постановка бизнес-процессов и\u00A0метрик поставки, управление интеграцией продукта в\u00A0банки-партнёры.",
      ],
    },
    meta: {
      en: "Madrid, Spain · Office · 2018 - 2021",
      ru: "Мадрид, Испания · Офис · 2018 - 2021",
    },
  },
  {
    name: { en: "United Company", ru: "United Company" },
    role: {
      en: "UX/UI Designer",
      ru: "UX/UI Designer",
    },
    bullets: {
      en: [
        "Designed the interfaces of a corporate CRM system for warehouse volume control and operations management.",
        "Delivered interface design across the company’s enterprise product line: logistics, operational management and customer account portals.",
        "Designed a new company product, an electric vehicle charging service, later brought to market.",
      ],
      ru: [
        "Проектирование интерфейсов корпоративной CRM-системы для контроля складских объёмов и\u00A0управления операциями.",
        "Интерфейсы для логистики, операционного менеджмента и\u00A0личных кабинетов пользователей в\u00A0линейке enterprise-продуктов компании.",
        "Проектирование нового продукта компании: сервиса электрозарядных станций, впоследствии выведенного на\u00A0рынок.",
      ],
    },
    meta: {
      en: "Minsk, Belarus · Office · 2016 - 2018",
      ru: "Минск, Беларусь · Офис · 2016 - 2018",
    },
  },
  {
    isEducation: true,
    name: { en: "Belarusian State University", ru: "Белорусский государственный университет" },
    role: {
      en: "Faculty of Journalism, specialization in PR Management",
      ru: "Факультет журналистики, специализация «PR-менеджмент»",
    },
    bullets: {
      en: [
        "Communications, information and organizational reputation: audience research, planning and evaluation of communication campaigns.",
      ],
      ru: [
        "Коммуникации, работа с\u00A0информацией и\u00A0репутацией организаций: исследование аудитории, планирование и\u00A0оценка коммуникационных кампаний.",
      ],
    },
    meta: {
      en: "Minsk, Belarus · Full time · 2015 - 2019",
      ru: "Минск, Беларусь · Очная форма · 2015 - 2019",
    },
  },
];
