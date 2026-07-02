"use client";

import { useEffect, useState } from "react";
import { Home, Compass, Map, MessageCircle, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  /** id de sección destino; "home" hace scroll al tope. */
  target: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Inicio", icon: Home, target: "home" },
  {
    id: "places-section",
    label: "Explorar",
    icon: Compass,
    target: "places-section",
  },
  { id: "tours-section", label: "Tours", icon: Map, target: "tours-section" },
  {
    id: "contact-section",
    label: "Contacto",
    icon: MessageCircle,
    target: "contact-section",
  },
];

export function BottomNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sectionIds = navItems
      .filter((i) => i.target !== "home")
      .map((i) => i.target);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Banda central: la sección que cruza el centro del viewport queda activa.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (window.scrollY < 120) setActive("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = (target: string) => {
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/90 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-4">
        {navItems.map(({ id, label, icon: Icon, target }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleClick(target)}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                isActive ? "text-accent" : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn("h-5 w-5", isActive && "text-accent")}
                strokeWidth={isActive ? 2.4 : 2}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
