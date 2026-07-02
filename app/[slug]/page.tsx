import { notFound } from "next/navigation";

import data from "@/data/cabana-serendipia.json";
import type { Alojamiento } from "@/lib/types";
import { HeroSection } from "@/modules/home/HeroSection";
import { QuickAccessGrid } from "@/modules/quickaccess/QuickAccessGrid";
import { BottomNav } from "@/components/layout/BottomNav";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { WifiModule } from "@/modules/wifi/WifiModule";
import { CheckInOutModule } from "@/modules/checkinout/CheckInOutModule";
import { ContactModule } from "@/modules/contact/ContactModule";
import { LocationModule } from "@/modules/location/LocationModule";
import { RulesModule } from "@/modules/rules/RulesModule";
import { ToursModule } from "@/modules/tours/ToursModule";
import { TransportModule } from "@/modules/transport/TransportModule";
import {
  ServicesModule,
  type ServiceCategory,
} from "@/modules/services/ServicesModule";
import { PlacesModule } from "@/modules/places/PlacesModule";
import { EventsModule } from "@/modules/events/EventsModule";
import { GalleryModule } from "@/modules/gallery/GalleryModule";
import { ReviewsModule } from "@/modules/reviews/ReviewsModule";
import { FaqModule } from "@/modules/faq/FaqModule";
import { WeatherModule } from "@/modules/weather/WeatherModule";
import { SocialModule } from "@/modules/social/SocialModule";

// Por ahora cargamos el JSON directamente. En el futuro vendrá de una base
// de datos según el slug de la URL.
const alojamiento = data as Alojamiento;

export default function Page({ params }: { params: { slug: string } }) {
  if (params.slug !== alojamiento.slug) notFound();

  const a = alojamiento;
  const m = a.modulosActivos;

  // Servicios consolidado: solo categorías activas y con datos.
  const serviceCategories: ServiceCategory[] = [
    { key: "restaurantes", label: "Restaurantes", lugares: a.restaurantes, active: m.restaurantes },
    { key: "cafeterias", label: "Cafeterías", lugares: a.cafeterias, active: m.cafeterias },
    { key: "supermercados", label: "Supermercados", lugares: a.supermercados, active: m.supermercados },
    { key: "farmacias", label: "Farmacias", lugares: a.farmacias, active: m.farmacias },
    { key: "hospitales", label: "Hospitales", lugares: a.hospitales, active: m.hospitales },
  ]
    .filter((c) => c.active && c.lugares.length > 0)
    .map(({ key, label, lugares }) => ({ key, label, lugares }));

  return (
    <main className="relative mx-auto min-h-screen max-w-md bg-background">
      {/* GRUPO 3 — Home y navegación */}
      <HeroSection data={a} />
      <QuickAccessGrid />

      {/* Módulos — renderizado condicional por modulosActivos. */}
      <div className="space-y-3 px-4 pb-28 pt-3">
        {/* GRUPO 4 — Módulos prioritarios */}
        {m.wifi && (
          <AnimatedSection id="wifi-section">
            <WifiModule wifi={a.wifi} />
          </AnimatedSection>
        )}
        {m.checkinout && (
          <AnimatedSection id="checkinout-section">
            <CheckInOutModule
              checkIn={a.checkIn}
              checkOut={a.checkOut}
              contacto={a.contacto}
            />
          </AnimatedSection>
        )}
        {m.contacto && (
          <AnimatedSection id="contact-section">
            <ContactModule contacto={a.contacto} />
          </AnimatedSection>
        )}
        {m.ubicacion && (
          <AnimatedSection id="location-section">
            <LocationModule ubicacion={a.ubicacion} />
          </AnimatedSection>
        )}
        {m.reglamento && (
          <AnimatedSection id="rules-section">
            <RulesModule reglamento={a.reglamento} />
          </AnimatedSection>
        )}

        {/* GRUPO 5 — Módulos de servicios */}
        {m.tours && a.tours.length > 0 && (
          <AnimatedSection id="tours-section">
            <ToursModule tours={a.tours} />
          </AnimatedSection>
        )}
        {m.transporte && (
          <AnimatedSection id="transport-section">
            <TransportModule transporte={a.transporte} />
          </AnimatedSection>
        )}
        {serviceCategories.length > 0 && (
          <AnimatedSection id="services-section">
            <ServicesModule categories={serviceCategories} />
          </AnimatedSection>
        )}

        {/* GRUPO 6 — Módulos informativos */}
        {m.lugaresTuristicos && a.lugaresTuristicos.length > 0 && (
          <AnimatedSection id="places-section">
            <PlacesModule lugares={a.lugaresTuristicos} />
          </AnimatedSection>
        )}
        {m.eventos && a.eventosLocales.length > 0 && (
          <AnimatedSection id="events-section">
            <EventsModule eventos={a.eventosLocales} />
          </AnimatedSection>
        )}
        {m.galeria && a.imagenes.length > 0 && (
          <AnimatedSection id="gallery-section">
            <GalleryModule imagenes={a.imagenes} />
          </AnimatedSection>
        )}
        {m.clima && (
          <AnimatedSection id="weather-section">
            <WeatherModule lat={a.ubicacion.lat} lng={a.ubicacion.lng} />
          </AnimatedSection>
        )}
        {m.resenas && (
          <AnimatedSection id="reviews-section">
            <ReviewsModule
              calificacion={a.calificacion}
              totalResenas={a.totalResenas}
              googleReviewsUrl={a.googleReviewsUrl}
              airbnbUrl={a.airbnbUrl}
            />
          </AnimatedSection>
        )}
        {m.faq && a.faq.length > 0 && (
          <AnimatedSection id="faq-section">
            <FaqModule faq={a.faq} />
          </AnimatedSection>
        )}
        {m.redesSociales && (
          <AnimatedSection id="social-section">
            <SocialModule redes={a.redesSociales} />
          </AnimatedSection>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
