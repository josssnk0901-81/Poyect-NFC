"use client";

import { motion } from "framer-motion";
import { Star, Home } from "lucide-react";

import { cn } from "@/lib/utils";
import { tapScale } from "@/lib/motion";
import { SectionCard } from "@/components/shared/SectionCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface ReviewsModuleProps {
  calificacion: number;
  totalResenas: number;
  googleReviewsUrl: string;
  airbnbUrl: string;
}

export function ReviewsModule({
  calificacion,
  totalResenas,
  googleReviewsUrl,
  airbnbUrl,
}: ReviewsModuleProps) {
  return (
    <SectionCard variant="dark">
      <SectionHeader dark subtitle="Comparte tu experiencia" title="Reseñas" />

      <div className="flex flex-col items-center text-center">
        <p className="text-5xl font-bold text-gold">
          {calificacion.toFixed(1)}
        </p>
        <div className="mt-1 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < Math.round(calificacion)
                  ? "fill-gold text-gold"
                  : "text-white/25"
              )}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-white/60">
          Basado en {totalResenas} reseñas
        </p>
      </div>

      <div className="mt-5 grid gap-2">
        <motion.a
          {...tapScale}
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gold py-3 text-sm font-bold tracking-wide text-card-dark"
        >
          <Star className="h-4 w-4" />
          Dejar reseña en Google
        </motion.a>
        <motion.a
          {...tapScale}
          href={airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl border border-border-dark bg-card-dark-2 py-3 text-sm font-bold tracking-wide text-white"
        >
          <Home className="h-4 w-4" />
          Ver en Airbnb
        </motion.a>
      </div>

      <p className="mt-4 text-center text-sm text-white/70">
        ¡Tu opinión nos ayuda mucho!
      </p>
    </SectionCard>
  );
}
