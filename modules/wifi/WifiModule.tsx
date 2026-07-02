"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Wifi, Eye, EyeOff, Copy, Share2, Zap } from "lucide-react";

import type { Wifi as WifiType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { tapScale } from "@/lib/motion";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { SectionCard } from "@/components/shared/SectionCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface WifiModuleProps {
  wifi: WifiType;
}

export function WifiModule({ wifi }: WifiModuleProps) {
  const [show, setShow] = useState(false);
  const { copied, copy } = useCopyToClipboard();

  const qrValue = `WIFI:T:${wifi.tipo};S:${wifi.nombre};P:${wifi.contrasena};;`;

  const handleShare = async () => {
    const text = `Red WiFi: ${wifi.nombre} · Contraseña: ${wifi.contrasena}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "WiFi", text });
      } catch {
        /* cancelado */
      }
    } else {
      await copy(text);
    }
  };

  return (
    <SectionCard variant="dark">
      <SectionHeader dark icon={Wifi} subtitle="Conexión rápida" title="WiFi" />

      {/* Red WiFi */}
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-wide text-white/50">
          Red WiFi
        </p>
        <div className="flex items-center gap-2">
          <Wifi className="h-[18px] w-[18px] text-gold" />
          <span className="font-mono text-lg font-semibold text-white">
            {wifi.nombre}
          </span>
        </div>
      </div>

      {/* Contraseña */}
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-wide text-white/50">
          Contraseña
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-2xl text-white">
            {show ? wifi.contrasena : "•".repeat(wifi.contrasena.length)}
          </span>
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="text-gold"
          >
            {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Acciones */}
      <div className="mb-5 grid grid-cols-2 gap-2">
        <motion.button
          {...tapScale}
          type="button"
          onClick={() => copy(wifi.contrasena)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gold py-3 text-sm font-bold tracking-wide text-card-dark"
        >
          <Copy className="h-4 w-4" />
          Copiar contraseña
        </motion.button>
        <motion.button
          {...tapScale}
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-2xl border border-border-dark bg-card-dark-2 py-3 text-sm font-bold tracking-wide text-white"
        >
          <Share2 className="h-4 w-4" />
          Compartir
        </motion.button>
      </div>

      {/* QR */}
      <div className="flex flex-col items-center">
        <div className="rounded-2xl bg-white p-4">
          <QRCodeSVG value={qrValue} size={160} level="M" />
        </div>
        <p className="mt-3 max-w-[240px] text-center text-xs text-white/60">
          Escanea con la cámara de tu teléfono para conectarte automáticamente
        </p>
      </div>

      {/* Velocidad */}
      {wifi.velocidad && (
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-light px-3 py-1 text-xs font-bold text-card-dark">
            <Zap className="h-3.5 w-3.5" />
            {wifi.velocidad}
          </span>
        </div>
      )}

      {/* Toast "¡Copiado!" */}
      <AnimatePresence>
        {copied && (
          <motion.div
            key="wifi-toast"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-x-0 bottom-24 z-50 mx-auto flex w-fit items-center gap-2",
              "rounded-full bg-card-dark px-4 py-2 text-sm font-semibold text-white shadow-card-dark"
            )}
          >
            <Copy className="h-4 w-4 text-gold" />
            ¡Copiado!
          </motion.div>
        )}
      </AnimatePresence>
    </SectionCard>
  );
}
