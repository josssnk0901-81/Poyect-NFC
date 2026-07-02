import { LogIn, LogOut, Clock } from "lucide-react";

import type { Contacto } from "@/lib/types";
import { buildWhatsappUrl, formatHora12 } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface CheckInOutModuleProps {
  checkIn: string;
  checkOut: string;
  contacto: Contacto;
}

export function CheckInOutModule({
  checkIn,
  checkOut,
  contacto,
}: CheckInOutModuleProps) {
  const lateUrl = buildWhatsappUrl(
    contacto.whatsapp,
    "Hola, me gustaría consultar disponibilidad de late check-out."
  );

  return (
    <section>
      <SectionHeader icon={Clock} subtitle="Horarios" title="Check In / Check Out" />

      <div className="grid grid-cols-2 gap-3">
        {/* Check In */}
        <div className="rounded-3xl border border-l-4 border-border border-l-accent bg-card p-4 shadow-card">
          <LogIn className="mb-2 h-6 w-6 text-accent" />
          <p className="text-sm font-medium text-muted-foreground">Check In</p>
          <p className="text-3xl font-bold text-accent">{checkIn}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            A partir de las {formatHora12(checkIn)}
          </p>
        </div>

        {/* Check Out */}
        <div className="rounded-3xl border border-l-4 border-border border-l-red-400 bg-card p-4 shadow-card">
          <LogOut className="mb-2 h-6 w-6 text-red-500" />
          <p className="text-sm font-medium text-muted-foreground">Check Out</p>
          <p className="text-3xl font-bold text-red-500">{checkOut}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Antes de las {formatHora12(checkOut)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-muted-foreground">
        ¿Necesitas late check-out?{" "}
        <a
          href={lateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          Escríbenos
        </a>
      </p>
    </section>
  );
}
