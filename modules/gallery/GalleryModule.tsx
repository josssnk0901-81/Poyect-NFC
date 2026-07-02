"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryModuleProps {
  imagenes: string[];
}

export function GalleryModule({ imagenes }: GalleryModuleProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const total = imagenes.length;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  return (
    <section>
      <SectionHeader icon={Images} subtitle="El espacio" title="Galería" />

      <div className="grid grid-cols-3 gap-2">
        {imagenes.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openAt(i)}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={src}
              alt={`Foto ${i + 1}`}
              fill
              sizes="(max-width: 448px) 33vw, 150px"
              className="object-cover transition-transform duration-200 hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          hideClose
          className="max-w-[94vw] border-0 bg-transparent p-0 shadow-none sm:max-w-lg"
        >
          <DialogTitle className="sr-only">Galería de fotos</DialogTitle>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black"
              >
                <Image
                  src={imagenes[index]}
                  alt={`Foto ${index + 1}`}
                  fill
                  sizes="94vw"
                  className="object-contain"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Cerrar */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute -top-3 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Navegación */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Anterior"
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Siguiente"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Contador */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              {index + 1} / {total}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
