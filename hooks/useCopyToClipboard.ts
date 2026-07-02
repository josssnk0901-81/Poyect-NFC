"use client";

import { useCallback, useState } from "react";

/**
 * Copia texto al portapapeles y expone un flag `copied` que se autolimpia.
 * Usado por el módulo WiFi para el feedback "¡Copiado!".
 */
export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), timeout);
        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { copied, copy };
}
