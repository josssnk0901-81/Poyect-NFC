import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Geist (variable) servida localmente — sin dependencia de red en build.
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cabaña Serendipia — Guía Digital",
  description:
    "Tu guía completa del alojamiento en San Cristóbal de Las Casas",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Serendipia",
  },
};

// En Next 14 el viewport y themeColor van en su PROPIO export, no en `metadata`.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(geistSans.variable, geistMono.variable, "font-sans")}
    >
      <body>{children}</body>
    </html>
  );
}
