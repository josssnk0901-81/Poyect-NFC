# Poyect NFC — Guía Digital para Alojamientos

Guía digital premium tipo app para alojamientos turísticos (Airbnb, cabañas, hoteles).
El huésped escanea un **QR o tag NFC** y accede a toda la información del alojamiento
como si fuera una app nativa instalada.

**Demo:** Cabaña Serendipia · San Cristóbal de Las Casas, Chiapas, México.

## Stack

- Next.js 14 (App Router) · React 18 · TypeScript 5
- Tailwind CSS 3 · shadcn/ui (Radix) · Framer Motion 11
- Leaflet (mapa) · qrcode.react (QR de WiFi) · Open-Meteo (clima, sin API key)

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) — redirige a `/cabana-serendipia`.

## Arquitectura

Todo el contenido vive en `data/cabana-serendipia.json`. Cada módulo (WiFi, tours,
reglamento, transporte, clima, galería…) se activa o desactiva con los booleanos de
`modulosActivos` — base para el futuro SaaS multi-tenant donde cada `slug` será un
alojamiento distinto.

```
app/[slug]/page.tsx   → ensambla los módulos según modulosActivos
modules/              → 17 módulos independientes
components/           → ui (shadcn) · shared · layout
data/                 → contenido del alojamiento (JSON)
lib/types.ts          → contrato TypeScript de toda la app
```

## Build de producción

```bash
npm run build
npm start
```
