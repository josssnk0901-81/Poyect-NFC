"use client";

import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Youtube,
  Music2,
  AtSign,
  type LucideIcon,
} from "lucide-react";

import type { RedesSociales } from "@/lib/types";
import { cn } from "@/lib/utils";
import { tapScale } from "@/lib/motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface SocialModuleProps {
  redes: RedesSociales;
}

interface SocialLink {
  key: keyof RedesSociales;
  label: string;
  icon: LucideIcon;
  className: string;
}

const allLinks: SocialLink[] = [
  {
    key: "instagram",
    label: "Instagram",
    icon: Instagram,
    className:
      "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
  },
  { key: "facebook", label: "Facebook", icon: Facebook, className: "bg-[#1877F2]" },
  // Lucide no tiene ícono de TikTok → usamos Music2.
  { key: "tiktok", label: "TikTok", icon: Music2, className: "bg-black" },
  { key: "youtube", label: "YouTube", icon: Youtube, className: "bg-[#FF0000]" },
];

export function SocialModule({ redes }: SocialModuleProps) {
  const links = allLinks.filter((l) => Boolean(redes[l.key]));

  if (links.length === 0) return null;

  return (
    <section>
      <SectionHeader icon={AtSign} subtitle="Mantente al día" title="Síguenos" />

      <div className="grid grid-cols-2 gap-3">
        {links.map(({ key, label, icon: Icon, className }) => (
          <motion.a
            key={key}
            {...tapScale}
            href={redes[key]}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex h-16 items-center justify-center gap-2 rounded-2xl font-bold text-white",
              className
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
