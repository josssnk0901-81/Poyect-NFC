"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MessageCircle, Compass } from "lucide-react";

import type { Tour } from "@/lib/types";
import { buildWhatsappUrl, cn, formatPrecio } from "@/lib/utils";
import { tapScale } from "@/lib/motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface ToursModuleProps {
  tours: Tour[];
}

const nivelColor: Record<Tour["nivel"], string> = {
  Fácil: "bg-accent-light text-accent",
  Moderado: "bg-amber-100 text-amber-700",
  Difícil: "bg-red-100 text-red-600",
};

export function ToursModule({ tours }: ToursModuleProps) {
  return (
    <section>
      <SectionHeader icon={Compass} subtitle="Aventuras locales" title="Tours" />

      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
        {tours.map((tour) => {
          const reservaHref =
            tour.reservaUrl && tour.reservaUrl.length > 0
              ? tour.reservaUrl
              : buildWhatsappUrl(
                  tour.whatsapp,
                  `Hola, me interesa el tour "${tour.nombre}".`
                );

          return (
            <article
              key={tour.id}
              className="w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card shadow-card"
            >
              <div className="relative aspect-video">
                <Image
                  src={tour.imagen}
                  alt={tour.nombre}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
                <span
                  className={cn(
                    "absolute left-2 top-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                    nivelColor[tour.nivel]
                  )}
                >
                  {tour.nivel}
                </span>
                <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  <Clock className="h-3 w-3" />
                  {tour.duracion}
                </span>
              </div>

              <div className="p-4">
                <p className="text-base font-bold text-accent">
                  {formatPrecio(tour.precio, tour.moneda)}
                </p>
                <h3 className="mt-0.5 font-semibold text-foreground">
                  {tour.nombre}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {tour.descripcion}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <motion.a
                    {...tapScale}
                    href={reservaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-2xl bg-accent py-2.5 text-center text-sm font-bold text-white"
                  >
                    Reservar
                  </motion.a>
                  <motion.a
                    {...tapScale}
                    href={buildWhatsappUrl(
                      tour.whatsapp,
                      `Hola, me interesa el tour "${tour.nombre}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border"
                  >
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  </motion.a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
