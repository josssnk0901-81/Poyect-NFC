"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { easeOutQuart } from "@/lib/motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  /** Retardo extra de entrada (s). Default 0 — el scroll ya controla el timing. */
  delay?: number;
  className?: string;
  /** % del elemento visible para activar la animación. Default 0.15. */
  amount?: number;
  /** id para el scroll anchor del módulo (ej. "wifi-section"). */
  id?: string;
}

/**
 * Envuelve CADA módulo de la página. Es el único mecanismo de scroll animation:
 * fade + slide-up al entrar en viewport, una sola vez.
 */
export function AnimatedSection({
  children,
  delay = 0,
  className,
  amount = 0.15,
  id,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: easeOutQuart }}
      className={className}
      style={{ scrollMarginTop: "1rem" }}
    >
      {children}
    </motion.section>
  );
}
