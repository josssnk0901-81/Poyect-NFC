import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * "light" → Card Claro (info, reglamento, mapa, FAQ, transporte).
   * "dark"  → Card Oscuro premium (WiFi, Contacto, Reseñas, Check In/Out).
   */
  variant?: "light" | "dark";
}

/**
 * Contenedor base de módulo. Implementa los tipos de card 1 y 2 del prompt.
 * (El "Card Imagen" tipo 3 se arma en cada módulo con next/image + overlay.)
 */
export const SectionCard = React.forwardRef<HTMLDivElement, SectionCardProps>(
  ({ variant = "light", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl",
          variant === "light"
            ? "border border-border bg-card p-5 text-card-foreground shadow-card"
            : "border border-border-dark bg-card-dark p-6 text-white shadow-card-dark",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SectionCard.displayName = "SectionCard";
