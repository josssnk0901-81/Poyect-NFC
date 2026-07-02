"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Star,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Heart,
  ChevronDown,
} from "lucide-react";

import type { Alojamiento } from "@/lib/types";
import { buildWhatsappUrl, cn } from "@/lib/utils";
import { tapScale } from "@/lib/motion";

interface HeroSectionProps {
  data: Alojamiento;
}

export function HeroSection({ data }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const heroY = useTransform(scrollY, [0, 400], [0, shouldReduceMotion ? 0 : 30]);

  const [saved, setSaved] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSaved(localStorage.getItem(`saved-${data.slug}`) === "1");
  }, [data.slug]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSaved = () => {
    setSaved((prev) => {
      const next = !prev;
      if (next) localStorage.setItem(`saved-${data.slug}`, "1");
      else localStorage.removeItem(`saved-${data.slug}`);
      return next;
    });
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = { title: data.nombre, text: data.descripcionCorta, url };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* el usuario canceló — sin acción */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Imagen con parallax sutil (máx 30px). scale-110 evita bordes blancos. */}
      <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
        <Image
          src={data.imagenHero}
          alt={data.nombre}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute bottom-[30%] left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="h-7 w-7 text-white/80" />
        </motion.div>
      </motion.div>

      {/* Contenido sobre el overlay */}
      <div className="pb-safe absolute inset-x-0 bottom-0">
        <div className="px-5 pb-3">
          {/* 1. Badge calificación */}
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm text-white backdrop-blur-sm">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="font-semibold">{data.calificacion}</span>
            <span className="text-white/70">•</span>
            <span className="text-white/80">{data.totalResenas} reseñas</span>
          </div>

          {/* 2. Nombre */}
          <h1 className="text-3xl font-bold leading-tight text-white">
            {data.nombre}
          </h1>

          {/* 3. Descripción corta */}
          <p className="mt-1 text-sm text-white/75">{data.descripcionCorta}</p>

          {/* 4. Ubicación */}
          <div className="mt-2 flex items-center gap-1.5 text-sm text-white/60">
            <MapPin className="h-4 w-4" />
            <span>
              {data.ubicacion.ciudad}, {data.ubicacion.estado}
            </span>
          </div>
        </div>

        {/* Barra de 4 acciones */}
        <div className="mx-4 mb-6 rounded-2xl bg-black/30 p-3 backdrop-blur-md">
          <div className="grid grid-cols-4 gap-2">
            <HeroAction
              as="a"
              href={buildWhatsappUrl(
                data.contacto.whatsapp,
                data.contacto.whatsappMensaje
              )}
              label="WhatsApp"
              icon={<MessageCircle className="h-6 w-6" />}
              iconClassName="text-[#25D366]"
            />
            <HeroAction
              as="a"
              href={`tel:${data.contacto.telefono}`}
              label="Llamar"
              icon={<Phone className="h-6 w-6" />}
            />
            <HeroAction
              as="button"
              onClick={handleShare}
              label="Compartir"
              icon={<Share2 className="h-6 w-6" />}
            />
            <HeroAction
              as="button"
              onClick={toggleSaved}
              label="Guardar"
              icon={
                <Heart
                  className={cn("h-6 w-6", saved && "fill-current text-red-500")}
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface HeroActionProps {
  as: "a" | "button";
  label: string;
  icon: React.ReactNode;
  iconClassName?: string;
  href?: string;
  onClick?: () => void;
}

function HeroAction({
  as,
  label,
  icon,
  iconClassName,
  href,
  onClick,
}: HeroActionProps) {
  const className =
    "flex flex-col items-center justify-center gap-1.5 rounded-xl py-1 text-white";
  const content = (
    <>
      <span className={cn("text-white", iconClassName)}>{icon}</span>
      <span className="text-[11px] font-medium">{label}</span>
    </>
  );

  if (as === "a") {
    return (
      <motion.a
        {...tapScale}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...tapScale}
      type="button"
      onClick={onClick}
      className={className}
    >
      {content}
    </motion.button>
  );
}
