import { Inter } from "next/font/google";

/**
 * Inter — шрифт из Figma (единственное начертание в макете: Regular/400).
 * next/font/google сам самохостит шрифт на этапе сборки — отдельного
 * запроса к Google Fonts из браузера не будет. Сайт теперь только EN,
 * поэтому кириллический сабсет не нужен.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const fontVariables = inter.variable;
