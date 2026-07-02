"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

interface WeatherState {
  temp: number | null;
  weatherCode: number | null;
  wind: number | null;
  loading: boolean;
  error: boolean;
}

/**
 * Clima actual vía Open-Meteo (gratis, sin API key, sin registro).
 * Devuelve temperatura (°C), código WMO, viento (km/h) + flags de carga/error.
 */
export function useWeather(lat: number, lng: number): WeatherState {
  const [state, setState] = useState<WeatherState>({
    temp: null,
    weatherCode: null,
    wind: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    const url =
      `${siteConfig.weatherApiBase}?latitude=${lat}&longitude=${lng}` +
      `&current=temperature_2m,weather_code,wind_speed_10m` +
      `&timezone=${encodeURIComponent(siteConfig.timezone)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("weather fetch failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const c = data?.current;
        setState({
          temp: c?.temperature_2m ?? null,
          weatherCode: c?.weather_code ?? null,
          wind: c?.wind_speed_10m ?? null,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, error: true }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [lat, lng]);

  return state;
}
