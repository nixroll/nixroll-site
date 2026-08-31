export type WorkRow = {
  name: { en: string; ru: string };
  role: { en: string; ru: string };
  bullets: { en: string[]; ru: string[] };
  meta: { en: string; ru: string };
  isEducation?: boolean;
};

export const work: WorkRow[] = [
  {
    name: { en: "SRG Plus", ru: "SRG Plus" },
    role: { en: "Product Lead", ru: "Product Lead" },
    bullets: {
      en: [
        "Built from zero a SaaS product for managing social media content inside a single application: formed the team, set up the development process and took the application through Apple review to the App Store.",
        "Launched the iOS application and the web version in parallel, reaching 50 active corporate clients and around 10,000 users within the first year.",
        "Own the product in full: strategy, roadmap, team, release cycle and monetization.",
      ],
      ru: [
        "Создание с нуля SaaS-продукта для управления контентом в социальных сетях внутри одного приложения: формирование команды, постановка процессов разработки и вывод приложения в App Store через ревью Apple.",
        "Параллельный выпуск iOS-приложения и веб-версии, за первый год после запуска 50 активных корпоративных клиентов и около 10 000 пользователей.",
        "Полная ответственность за продукт: стратегия, роадмап, команда, релизный цикл и монетизация.",
      ],
    },
    meta: {
      en: "Los Angeles, United States · Remote · 2024 - now",
      ru: "Лос-Анджелес, США · Удалённо · 2024 - сейчас",
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
        "Led a team of 10 and a portfolio of five client products, each with its own development cycle and release schedule.",
        "Introduced new quality control systems across the studio’s delivery process, extending average client retention by a year.",
        "Launched and led SRG Plus, a product incubated inside the studio, moving the company from client services into its own product.",
      ],
      ru: [
        "Руководство командой из 10 человек и портфелем из пяти клиентских продуктов, каждый с собственным циклом разработки и графиком релизов.",
        "Внедрение новых систем контроля качества в процессы студии, увеличившее средний срок удержания клиентов на год.",
        "Запуск и руководство SRG Plus, продуктом, выросшим внутри студии: переход компании от клиентской разработки к собственному продукту.",
      ],
    },
    meta: {
      en: "Los Angeles, United States · Remote · 2021 - 2024",
      ru: "Лос-Анджелес, США · Удалённо · 2021 - 2024",
    },
  },
  {
    name: { en: "Kinez", ru: "Kinez" },
    role: { en: "Project Manager", ru: "Project Manager" },
    bullets: {
      en: [
        "Won a competitive tender and delivered the MVP of Kinez App, a mobile controller for a prosthetic knee module, in three months on iOS and Android simultaneously.",
        "Scaled the product from MVP to full public release by month eight, then transferred the product, team and documentation to the owner.",
        "Delivered a hardware connected medtech product at a Skolkovo resident company, coordinating mobile development with the prosthetics engineering team.",
      ],
      ru: [
        "Победа в тендере и вывод MVP приложения Kinez App для управления коленным модулем протеза за три месяца, одновременно на iOS и Android.",
        "Развитие продукта от MVP до полного публичного релиза к восьмому месяцу с последующей передачей продукта, команды и документации собственнику.",
        "Ведение медтех-продукта в связке с аппаратной частью в компании-резиденте Сколково, координация мобильной разработки с инженерами протеза.",
      ],
    },
    meta: {
      en: "Moscow, Russia · Project · 2019 - 2020",
      ru: "Москва, Россия · Проект · 2019 - 2020",
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
        "Delivered operational banking software for Banco Santander at a Madrid based enterprise software company, joining remotely and relocating to Madrid within three months.",
        "Launched a corporate calculator for Banco Santander, a product serving more than 50,000 users.",
        "Moved from design into project management, leading a team of 12 and establishing business processes, delivery metrics and the working protocol between the bank and engineering.",
      ],
      ru: [
        "Проектирование и разработка операционного ПО для банковской системы Banco Santander в мадридской компании корпоративной разработки, старт на удалённой позиции с переездом в Мадрид на третий месяц.",
        "Запуск корпоративного калькулятора для Banco Santander, продукта более чем для 50 000 пользователей.",
        "Переход из дизайна в проектное управление: руководство командой из 12 человек, постановка бизнес-процессов, метрик поставки и регламента взаимодействия между банком и разработкой.",
      ],
    },
    meta: {
      en: "Madrid, Spain · Office · 2019 - 2020",
      ru: "Мадрид, Испания · Офис · 2019 - 2020",
    },
  },
  {
    name: { en: "United Company", ru: "United Company" },
    role: { en: "UX/UI Designer", ru: "UX/UI Designer" },
    bullets: {
      en: [
        "Designed the interfaces of a corporate CRM system for warehouse volume control and operations management.",
        "Delivered software for logistics, operational management and customer account portals across the company’s enterprise product line.",
        "Designed a new company product, an electric vehicle charging service, later brought to market.",
      ],
      ru: [
        "Проектирование интерфейсов корпоративной CRM-системы для контроля складских объёмов и управления операциями.",
        "Разработка ПО для логистики, операционного менеджмента и личных кабинетов пользователей в линейке enterprise-продуктов компании.",
        "Проектирование нового продукта компании: сервиса электрозарядных станций, впоследствии выведенного на рынок.",
      ],
    },
    meta: {
      en: "Minsk, Belarus · Office · 2016 - 2019",
      ru: "Минск, Беларусь · Офис · 2016 - 2019",
    },
  },
  {
    isEducation: true,
    name: {
      en: "Belarusian State University",
      ru: "Белорусский государственный университет",
    },
    role: {
      en: "Faculty of Journalism, BA in Information and Communication",
      ru: "Факультет журналистики, специальность «Информация и коммуникация»",
    },
    bullets: {
      en: [
        "A degree at the intersection of strategic communications, information management and reputation: communication strategy, media and public relations.",
      ],
      ru: [
        "Специальность на стыке стратегических коммуникаций, работы с информацией и управления репутацией: коммуникационные стратегии, медиа, связи с общественностью.",
      ],
    },
    meta: {
      en: "Minsk, Belarus · Full time · 2015 - 2019",
      ru: "Минск, Беларусь · Очная форма · 2015 - 2019",
    },
  },
];
