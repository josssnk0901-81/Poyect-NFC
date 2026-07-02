"use client";

import {
  ScrollText,
  CheckCircle2,
  PawPrint,
  Cigarette,
  Moon,
  Trash2,
  Users,
} from "lucide-react";

import type { Reglamento } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RulesModuleProps {
  reglamento: Reglamento;
}

function PermisoBadge({
  permitido,
  okText,
  noText,
}: {
  permitido: boolean;
  okText: string;
  noText: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        permitido ? "bg-accent-light text-accent" : "bg-red-100 text-red-600"
      )}
    >
      {permitido ? okText : noText}
    </span>
  );
}

export function RulesModule({ reglamento }: RulesModuleProps) {
  return (
    <section>
      <SectionHeader
        icon={ScrollText}
        subtitle="Reglas de la casa"
        title="Reglamento"
      />

      <div className="rounded-3xl border border-border bg-card px-5 shadow-card">
        <Accordion type="single" collapsible className="w-full">
          {/* Reglas generales */}
          <AccordionItem value="reglas">
            <AccordionTrigger>Reglas generales</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {reglamento.reglas.map((regla, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{regla}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Mascotas */}
          <AccordionItem value="mascotas">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-accent" />
                Mascotas
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <PermisoBadge
                  permitido={reglamento.mascotas.permitido}
                  okText="Permitidas"
                  noText="No permitidas"
                />
                <span className="text-muted-foreground">
                  {reglamento.mascotas.detalle}
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Fumar */}
          <AccordionItem value="fumar">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <Cigarette className="h-4 w-4 text-accent" />
                Fumar
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <PermisoBadge
                  permitido={reglamento.fumar.permitido}
                  okText="Permitido"
                  noText="Prohibido"
                />
                <span className="text-muted-foreground">
                  {reglamento.fumar.detalle}
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Ruido y silencio */}
          <AccordionItem value="ruido">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-accent" />
                Ruido y silencio
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-foreground">
                  Horas quietas: {reglamento.horasQuietas}
                </span>
                <span className="text-muted-foreground">{reglamento.ruido}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Basura y reciclaje */}
          <AccordionItem value="basura" className="border-b-0">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-accent" />
                Basura y reciclaje
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <span className="text-muted-foreground">{reglamento.basura}</span>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Footer: capacidad máxima */}
      <div className="mt-3 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 text-sm font-semibold text-accent">
          <Users className="h-4 w-4" />
          Capacidad máxima: {reglamento.capacidadMaxima} personas
        </span>
      </div>
    </section>
  );
}
