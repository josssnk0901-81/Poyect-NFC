import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Ícono de Lucide a la izquierda del título. */
  icon?: LucideIcon;
  title: string;
  /** Eyebrow en mayúsculas (ej. "CONEXIÓN RÁPIDA"). */
  subtitle?: string;
  /** Estilos para usarse dentro de una card oscura. */
  dark?: boolean;
  className?: string;
}

/**
 * Encabezado de módulo. Patrón tipográfico fijo del prompt:
 *  SUBTÍTULO → text-[10px] bold tracking-[0.15em] uppercase (gold/oscuro, accent/claro)
 *  TÍTULO    → text-xl bold (white/oscuro, foreground/claro)
 */
export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {subtitle && (
        <p
          className={cn(
            "mb-1 text-[10px] font-bold uppercase tracking-[0.15em]",
            dark ? "text-gold" : "text-accent"
          )}
        >
          {subtitle}
        </p>
      )}
      <div className="flex items-center gap-2.5">
        {Icon && (
          <Icon
            size={24}
            className={cn("shrink-0", dark ? "text-gold" : "text-accent")}
          />
        )}
        <h2
          className={cn(
            "text-xl font-bold leading-tight",
            dark ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
