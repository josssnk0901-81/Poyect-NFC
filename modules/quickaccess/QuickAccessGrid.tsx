"use client";

import { motion, type Variants } from "framer-motion";
import {
  Wifi,
  MessageCircle,
  ScrollText,
  LogIn,
  MapPin,
  Compass,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { easeOutQuart, tapScaleSubtle } from "@/lib/motion";

interface QuickAccessItem {
  icon: LucideIcon;
  subtitle: string;
  title: string;
  targetId: string;
}

// Orden por filas para lograr las columnas del prompt:
//   Col 1: WiFi | Reglamento | Cómo llegar
//   Col 2: Contacto | Check In/Out | Tours
const items: QuickAccessItem[] = [
  { icon: Wifi, subtitle: "Conexión", title: "WiFi", targetId: "wifi-section" },
  {
    icon: MessageCircle,
    subtitle: "Soporte",
    title: "Contacto",
    targetId: "contact-section",
  },
  {
    icon: ScrollText,
    subtitle: "La casa",
    title: "Reglamento",
    targetId: "rules-section",
  },
  {
    icon: LogIn,
    subtitle: "Horarios",
    title: "Check In/Out",
    targetId: "checkinout-section",
  },
  {
    icon: MapPin,
    subtitle: "Ubicación",
    title: "Cómo llegar",
    targetId: "location-section",
  },
  {
    icon: Compass,
    subtitle: "Aventuras",
    title: "Tours",
    targetId: "tours-section",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.38, ease: easeOutQuart },
  },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function QuickAccessGrid() {
  return (
    <div className="px-4 pt-5">
      <p className="mb-3 text-base font-bold text-foreground">
        ↓ ¿Qué deseas hacer?
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 gap-3"
      >
        {items.map(({ icon: Icon, subtitle, title, targetId }) => (
          <motion.button
            key={targetId}
            type="button"
            variants={item}
            onClick={() => scrollToId(targetId)}
            {...tapScaleSubtle}
            className={cn(
              "flex flex-col items-start gap-2 rounded-3xl border border-border bg-card p-4 text-left shadow-card"
            )}
          >
            <Icon size={32} className="text-accent" />
            <div>
              <p className="mb-0.5 text-[9px] font-bold uppercase tracking-widest text-gold">
                {subtitle}
              </p>
              <p className="text-sm font-bold text-foreground">{title}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
