// =============================================================
//  Configuración global del sitio (no específica de un alojamiento).
//  En el futuro SaaS, lo específico vendrá del JSON / base de datos;
//  esto son los valores de marca de la plataforma.
// =============================================================

export const siteConfig = {
  /** Slug que se carga por defecto en la raíz "/". */
  defaultSlug: "cabana-serendipia",
  /** Color de acento de la marca (verde bosque chiapaneco). */
  themeColor: "#2D6A4F",
  /** Color de fondo (beige cálido) — debe coincidir con tailwind `background`. */
  backgroundColor: "#F2F0EB",
  /** Nombre de la plataforma para metadatos genéricos. */
  platformName: "Guía Digital",
  /** Endpoint del clima — Open-Meteo, gratis y sin API key. */
  weatherApiBase: "https://api.open-meteo.com/v1/forecast",
  /** Zona horaria por defecto para el clima. */
  timezone: "America/Mexico_City",
} as const;

export type SiteConfig = typeof siteConfig;
