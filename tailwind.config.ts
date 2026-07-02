import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // ---- Tokens semánticos (shadcn/ui) mapeados a la paleta del prompt ----
        border: "#E2DED8",
        input: "#E2DED8",
        ring: "#2D6A4F",
        background: "#F2F0EB", // Beige cálido (no blanco frío)
        foreground: "#1A1A1A",
        primary: { DEFAULT: "#2D6A4F", foreground: "#FFFFFF" }, // Verde bosque chiapaneco
        secondary: { DEFAULT: "#F0EDE8", foreground: "#1A1A1A" },
        destructive: { DEFAULT: "#EF4444", foreground: "#FFFFFF" },
        muted: { DEFAULT: "#F0EDE8", foreground: "#6B6860" },
        accent: {
          DEFAULT: "#2D6A4F", // Verde bosque (marca)
          foreground: "#FFFFFF",
          light: "#E8F5E9", // Verde muy claro para badges/fondos suaves
        },
        popover: { DEFAULT: "#FFFFFF", foreground: "#1A1A1A" },
        card: { DEFAULT: "#FFFFFF", foreground: "#1A1A1A" },
        // ---- Tokens propios del prompt ----
        "card-dark": "#1C2B22", // Verde muy oscuro — cards de acción premium
        "card-dark-2": "#162219", // Variante más profunda para hover
        "border-dark": "#2E4038", // Borde sutil en cards oscuras
        gold: {
          DEFAULT: "#C4994A", // Dorado — iconos y highlights en cards oscuras
          light: "#FDF3DC", // Dorado muy claro para badges
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06)",
        "card-dark": "0 8px 32px rgba(0,0,0,0.20)",
        "card-lift": "0 8px 24px rgba(45,106,79,0.15)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
