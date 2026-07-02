// =============================================================
//  CONTRATO DE TIPOS — toda la aplicación lee de estas interfaces.
//  Crear/editar esto ANTES que cualquier otro archivo de la app.
// =============================================================

export interface Alojamiento {
  slug: string;
  nombre: string;
  descripcion: string;
  descripcionCorta: string;
  calificacion: number;
  totalResenas: number;
  imagenHero: string;
  imagenes: string[];
  video?: string;
  ubicacion: Ubicacion;
  contacto: Contacto;
  checkIn: string;
  checkOut: string;
  wifi: Wifi;
  reglamento: Reglamento;
  tours: Tour[];
  transporte: Transporte;
  restaurantes: Lugar[];
  cafeterias: Lugar[];
  supermercados: Lugar[];
  farmacias: Lugar[];
  hospitales: Lugar[];
  lugaresTuristicos: LugarTuristico[];
  eventosLocales: Evento[];
  faq: FAQ[];
  redesSociales: RedesSociales;
  googleReviewsUrl: string;
  airbnbUrl: string;
  modulosActivos: ModulosActivos;
}

export interface Ubicacion {
  direccion: string;
  ciudad: string;
  estado: string;
  pais: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  wazeUrl: string;
  descripcionComo: string;
}

export interface Contacto {
  whatsapp: string;
  whatsappMensaje: string;
  telefono: string;
  email: string;
  emergencias: string;
  recepcionHorario: string;
}

export interface Wifi {
  nombre: string;
  contrasena: string;
  tipo: "WPA2" | "WPA3" | "WEP" | "nopass";
  velocidad?: string;
}

export interface Reglamento {
  reglas: string[];
  mascotas: { permitido: boolean; detalle: string };
  fumar: { permitido: boolean; detalle: string };
  ruido: string;
  basura: string;
  horasQuietas: string;
  capacidadMaxima: number;
}

export interface Tour {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  moneda: string;
  duracion: string;
  nivel: "Fácil" | "Moderado" | "Difícil";
  whatsapp: string;
  reservaUrl?: string;
}

export interface Transporte {
  taxi: TransporteItem[];
  aeropuerto: TransporteItem[];
  otros: TransporteItem[];
}

export interface TransporteItem {
  nombre: string;
  descripcion: string;
  precio?: string;
  telefono?: string;
  whatsapp?: string;
  icono: string;
}

export interface Lugar {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  calificacion?: number;
  direccion: string;
  googleMapsUrl: string;
  categoria?: string;
}

export interface LugarTuristico extends Lugar {
  distancia: string;
  tiempoVisita: string;
}

export interface Evento {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  fecha: string;
  lugar: string;
  url?: string;
  gratis: boolean;
  precio?: string;
}

export interface FAQ {
  id: string;
  pregunta: string;
  respuesta: string;
}

export interface RedesSociales {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
}

export interface ModulosActivos {
  wifi: boolean;
  contacto: boolean;
  reglamento: boolean;
  ubicacion: boolean;
  checkinout: boolean;
  tours: boolean;
  transporte: boolean;
  restaurantes: boolean;
  cafeterias: boolean;
  supermercados: boolean;
  farmacias: boolean;
  hospitales: boolean;
  lugaresTuristicos: boolean;
  eventos: boolean;
  galeria: boolean;
  clima: boolean;
  resenas: boolean;
  faq: boolean;
  redesSociales: boolean;
}
