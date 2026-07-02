import Image from "next/image";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

import type { Evento } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface EventsModuleProps {
  eventos: Evento[];
}

export function EventsModule({ eventos }: EventsModuleProps) {
  return (
    <section>
      <SectionHeader
        icon={Calendar}
        subtitle="Qué hacer"
        title="Eventos locales"
      />

      <div className="space-y-3">
        {eventos.map((evento) => (
          <article
            key={evento.id}
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-card"
          >
            <div className="relative aspect-video">
              <Image
                src={evento.imagen}
                alt={evento.nombre}
                fill
                sizes="(max-width: 448px) 100vw, 448px"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                {evento.fecha}
              </span>
              <span
                className={
                  evento.gratis
                    ? "absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white"
                    : "absolute right-3 top-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white"
                }
              >
                {evento.gratis ? "Gratis" : evento.precio}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-foreground">{evento.nombre}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{evento.lugar}</span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                {evento.descripcion}
              </p>
              {evento.url && (
                <a
                  href={evento.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  <ExternalLink className="h-4 w-4" />
                  Más info
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
