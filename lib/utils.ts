import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — combina clases condicionales (clsx) y resuelve conflictos de Tailwind (twMerge).
 * Es la utilidad estándar de shadcn/ui usada en todos los componentes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea un número como precio con separador de miles. */
export function formatPrecio(precio: number, moneda: string = "MXN"): string {
  return `$${precio.toLocaleString("es-MX")} ${moneda}`;
}

/** Construye un enlace de WhatsApp con mensaje opcional pre-rellenado. */
export function buildWhatsappUrl(numero: string, mensaje?: string): string {
  const base = `https://wa.me/${numero.replace(/[^\d]/g, "")}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/** Convierte "HH:MM" (24h) a formato 12h con am/pm. Ej: "15:00" → "3:00 pm". */
export function formatHora12(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  const h = parseInt(hStr, 10);
  const m = mStr ?? "00";
  if (Number.isNaN(h)) return hhmm;
  const period = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${period}`;
}
