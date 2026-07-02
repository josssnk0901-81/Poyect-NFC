"use client";

import { HelpCircle } from "lucide-react";

import type { FAQ } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqModuleProps {
  faq: FAQ[];
}

export function FaqModule({ faq }: FaqModuleProps) {
  return (
    <section>
      <SectionHeader
        icon={HelpCircle}
        subtitle="Preguntas frecuentes"
        title="FAQ"
      />

      <div className="rounded-3xl border border-border bg-card px-5 shadow-card">
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, i) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className={i === faq.length - 1 ? "border-b-0" : undefined}
            >
              <AccordionTrigger>
                <span className="flex items-start gap-2 pr-2">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item.pregunta}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pl-6 text-sm leading-relaxed text-muted-foreground">
                  {item.respuesta}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
