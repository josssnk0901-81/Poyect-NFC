import Image from "next/image";
import { MapPin, Star, Footprints, Clock } from "lucide-react";

import type { LugarTuristico } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface PlacesModuleProps {
  lugares: LugarTuristico[];
}

export function PlacesModule({ lugares }: PlacesModuleProps) {
  return (
    <section>
      <SectionHeader
        icon={MapPin}
        subtitle="Explora la zona"
        title="Lugares turísticos"
      />

      <div className="space-y-3">
        {lugares.map((lugar) => (
          <article
            key={lugar.id}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <Image
              src={lugar.imagen}
              alt={lugar.nombre}
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="mb-2 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm">
                  <Footprints className="h-3 w-3" />
                  {lugar.distancia}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm">
                  <Clock className="h-3 w-3" />
                  {lugar.tiempoVisita}
                </span>
              </div>

              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-tight">
                    {lugar.nombre}
                  </h3>
                  {typeof lugar.calificacion === "number" && (
                    <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/80">
                      <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                      {lugar.calificacion}
                    </span>
                  )}
                </div>
                <a
                  href={lugar.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full bg-gold px-3.5 py-2 text-xs font-bold text-card-dark"
                >
                  Ver en el mapa
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
