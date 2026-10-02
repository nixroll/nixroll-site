import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteMetadata } from "@/lib/metadata";
import { fontVariables } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
