import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";

// La raíz redirige al alojamiento por defecto.
// En el futuro SaaS, cada slug será un alojamiento distinto.
export default function Home() {
  redirect(`/${siteConfig.defaultSlug}`);
}
