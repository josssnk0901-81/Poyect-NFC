import type { Transition } from "framer-motion";

/**
 * Curva ease-out-quart — suave y natural. Es la curva de entrada estándar
 * de toda la app (la usan AnimatedSection y el stagger de QuickAccess).
 */
export const easeOutQuart: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 22,
};

const springSoft: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 28,
};

/**
 * Hover/tap para elementos interactivos prominentes:
 * botones de acción primaria, cards de acceso rápido, tour cards, contacto.
 * Uso: <motion.button {...tapScale}>…</motion.button>
 */
export const tapScale = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.96 },
  transition: springSnappy,
};

/** Variante más discreta para cards/elementos secundarios. */
export const tapScaleSubtle = {
  whileHover: { scale: 1.015 },
  whileTap: { scale: 0.97 },
  transition: springSoft,
};
