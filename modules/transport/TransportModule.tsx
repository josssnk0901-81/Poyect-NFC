"use client";

import { Car, Plane, Bus, Phone, MessageCircle, type LucideIcon } from "lucide-react";

import type { Transporte, TransporteItem } from "@/lib/types";
import { buildWhatsappUrl } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface TransportModuleProps {
  transporte: Transporte;
}

const iconMap: Record<string, LucideIcon> = {
  car: Car,
  plane: Plane,
  bus: Bus,
};

function TransporteRow({ item }: { item: TransporteItem }) {
  const Icon = iconMap[item.icono] ?? Car;

  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-foreground">{item.nombre}</p>
          {item.precio && (
            <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold text-foreground">
              {item.precio}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {item.descripcion}
        </p>
        {item.whatsapp ? (
          <a
            href={buildWhatsappUrl(item.whatsapp, `Hola, quiero información sobre "${item.nombre}".`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        ) : item.telefono ? (
          <a
            href={`tel:${item.telefono}`}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
          >
            <Phone className="h-4 w-4" />
            Llamar
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function TransportModule({ transporte }: TransportModuleProps) {
  const groups = [
    { key: "taxi", label: "Taxi", items: transporte.taxi },
    { key: "aeropuerto", label: "Aeropuerto", items: transporte.aeropuerto },
    { key: "otros", label: "Otros", items: transporte.otros },
  ].filter((g) => g.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <section>
      <SectionHeader icon={Bus} subtitle="Cómo moverse" title="Transporte" />

      <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
        <Tabs defaultValue={groups[0].key}>
          <TabsList className="no-scrollbar flex w-full justify-start overflow-x-auto">
            {groups.map((g) => (
              <TabsTrigger key={g.key} value={g.key} className="shrink-0">
                {g.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {groups.map((g) => (
            <TabsContent key={g.key} value={g.key} className="mt-1">
              <div className="divide-y divide-border">
                {g.items.map((item, i) => (
                  <TransporteRow key={i} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
