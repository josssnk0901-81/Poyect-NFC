"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Navigation, Share2 } from "lucide-react";

import type { Ubicacion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { tapScale } from "@/lib/motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

// El mapa de Leaflet REQUIERE carga solo en cliente (sin SSR).
const LeafletMap = dynamic(() => import("@/components/shared/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[220px] w-full animate-pulse rounded-2xl bg-muted" />
  ),
});

interface LocationModuleProps {
  ubicacion: Ubicacion;
}

export function LocationModule({ ubicacion }: LocationModuleProps) {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Ubicación",
          text: ubicacion.direccion,
          url: ubicacion.googleMapsUrl,
        });
      } catch {
        /* cancelado */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(ubicacion.googleMapsUrl);
    }
  };

  return (
    <section>
      <SectionHeader icon={MapPin} subtitle="Ubicación" title="Cómo Llegar" />

      <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
        {/* Dirección */}
        <div className="mb-3 flex items-start gap-2">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm font-medium text-foreground">
            {ubicacion.direccion}
          </p>
        </div>

        {/* Cómo llegar (texto) */}
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {ubicacion.descripcionComo}
        </p>

        {/* Mapa */}
        <div className="overflow-hidden rounded-2xl border border-border">
          <LeafletMap
            lat={ubicacion.lat}
            lng={ubicacion.lng}
            label={ubicacion.direccion}
          />
        </div>

        {/* Botones */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <ActionLink
            href={ubicacion.googleMapsUrl}
            icon={MapPin}
            label="Maps"
            primary
          />
          <ActionLink href={ubicacion.wazeUrl} icon={Navigation} label="Waze" />
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-muted py-3 text-xs font-bold text-foreground"
          >
            <Share2 className="h-4 w-4" />
            Compartir
          </button>
        </div>
      </div>
    </section>
  );
}

function ActionLink({
  href,
  icon: Icon,
  label,
  primary = false,
}: {
  href: string;
  icon: typeof MapPin;
  label: string;
  primary?: boolean;
}) {
  return (
    <motion.a
      {...tapScale}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center gap-1.5 rounded-2xl py-3 text-xs font-bold",
        primary
          ? "bg-accent text-white"
          : "border border-border bg-muted text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </motion.a>
  );
}
