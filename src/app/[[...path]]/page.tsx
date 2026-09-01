import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutSection } from "@/sections/AboutSection";
import { WorkSection } from "@/sections/WorkSection";
import { NotesSection } from "@/sections/NotesSection";
import { pageMetadata } from "@/lib/metadata";
import { allRoutes, parsePath } from "@/lib/routes";

export const revalidate = 60;

export function generateStaticParams() {
  return allRoutes();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}): Promise<Metadata> {
  const { path } = await params;
  const route = parsePath(path);
  if (!route) return {};
  return pageMetadata(route.locale, route.section);
}

/**
 * Одна страница на все адреса сайта: раздел и язык вычисляются из пути
 * (см. src/lib/routes.ts). About — главная, поэтому «/» и «/ru» ведут
 * именно на неё.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;
  const route = parsePath(path);
  if (!route) notFound();

  const { locale, section } = route;
  if (section === "work") return <WorkSection locale={locale} />;
  if (section === "notes") return <NotesSection locale={locale} />;
  return <AboutSection locale={locale} />;
}
