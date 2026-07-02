"use client";

import { CloudSun, Wind } from "lucide-react";

import { useWeather } from "@/hooks/useWeather";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface WeatherModuleProps {
  lat: number;
  lng: number;
}

/** Convierte un código WMO a descripción + emoji. */
function wmoToInfo(code: number | null): { text: string; emoji: string } {
  if (code === null) return { text: "Variable", emoji: "🌤️" };
  if (code === 0) return { text: "Despejado", emoji: "☀️" };
  if (code === 1 || code === 2 || code === 3)
    return { text: "Parcialmente nublado", emoji: "⛅" };
  if (code === 45 || code === 48) return { text: "Niebla", emoji: "🌫️" };
  if (code >= 51 && code <= 67) return { text: "Lluvia ligera", emoji: "🌧️" };
  if (code >= 80 && code <= 82) return { text: "Chubascos", emoji: "🌦️" };
  if (code >= 95 && code <= 99) return { text: "Tormenta", emoji: "⛈️" };
  return { text: "Variable", emoji: "🌤️" };
}

export function WeatherModule({ lat, lng }: WeatherModuleProps) {
  const { temp, weatherCode, wind, loading, error } = useWeather(lat, lng);
  const info = wmoToInfo(weatherCode);

  return (
    <section>
      <SectionHeader
        icon={CloudSun}
        subtitle="Condiciones actuales"
        title="Clima"
      />

      <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
        {loading ? (
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-12 w-28 animate-pulse rounded-lg bg-muted" />
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
          </div>
        ) : error ? (
          <p className="text-sm text-muted-foreground">
            No pudimos cargar el clima en este momento.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold text-foreground">
                  {temp !== null ? Math.round(temp) : "--"}
                  <span className="text-2xl align-top">°C</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{info.text}</p>
              </div>
              <span className="text-4xl" aria-hidden>
                {info.emoji}
              </span>
            </div>
            {wind !== null && (
              <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Wind className="h-4 w-4" />
                <span>{Math.round(wind)} km/h</span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
