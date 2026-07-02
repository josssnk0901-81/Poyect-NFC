"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Mail,
  AlertTriangle,
  Clock,
  Headset,
} from "lucide-react";

import type { Contacto } from "@/lib/types";
import { buildWhatsappUrl, cn } from "@/lib/utils";
import { tapScale } from "@/lib/motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface ContactModuleProps {
  contacto: Contacto;
}

export function ContactModule({ contacto }: ContactModuleProps) {
  const actions = [
    {
      label: "WhatsApp",
      href: buildWhatsappUrl(contacto.whatsapp, contacto.whatsappMensaje),
      icon: MessageCircle,
      className: "bg-[#25D366] text-white",
      external: true,
    },
    {
      label: "Llamar",
      href: `tel:${contacto.telefono}`,
      icon: Phone,
      className: "bg-blue-500 text-white",
      external: false,
    },
    {
      label: "Email",
      href: `mailto:${contacto.email}`,
      icon: Mail,
      className: "bg-muted text-foreground",
      external: false,
    },
    {
      label: `Emergencias · ${contacto.emergencias}`,
      href: `tel:${contacto.emergencias}`,
      icon: AlertTriangle,
      className: "bg-red-500 text-white",
      external: false,
    },
  ];

  return (
    <section>
      <SectionHeader icon={Headset} subtitle="Soporte al huésped" title="Contacto" />

      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, href, icon: Icon, className, external }) => (
          <motion.a
            key={label}
            {...tapScale}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cn(
              "flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl p-3 text-center text-sm font-bold shadow-card",
              className
            )}
          >
            <Icon className="h-7 w-7" />
            <span className="leading-tight">{label}</span>
          </motion.a>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{contacto.recepcionHorario}</span>
      </div>
    </section>
  );
}
