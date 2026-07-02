"use client";

import Image from "next/image";
import { Star, MapPin, Store } from "lucide-react";

import type { Lugar } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export interface ServiceCategory {
  key: string;
  label: string;
  lugares: Lugar[];
}

interface ServicesModuleProps {
  categories: ServiceCategory[];
}

function LugarRow({ lugar }: { lugar: Lugar }) {
  return (
    <div className="flex gap-3 py-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={lugar.imagen}
          alt={lugar.nombre}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-foreground">{lugar.nombre}</p>
          {typeof lugar.calificacion === "number" && (
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {lugar.calificacion}
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
          {lugar.descripcion}
        </p>
        <a
          href={lugar.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-accent"
        >
          <MapPin className="h-4 w-4" />
          Cómo llegar
        </a>
      </div>
    </div>
  );
}

export function ServicesModule({ categories }: ServicesModuleProps) {
  if (categories.length === 0) return null;

  return (
    <section>
      <SectionHeader icon={Store} subtitle="Cerca de ti" title="Servicios" />

      <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
        <Tabs defaultValue={categories[0].key}>
          <TabsList className="no-scrollbar mb-1 flex w-full justify-start overflow-x-auto">
            {categories.map((c) => (
              <TabsTrigger key={c.key} value={c.key} className="shrink-0">
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((c) => (
            <TabsContent key={c.key} value={c.key}>
              <div className="divide-y divide-border">
                {c.lugares.map((lugar) => (
                  <LugarRow key={lugar.id} lugar={lugar} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
