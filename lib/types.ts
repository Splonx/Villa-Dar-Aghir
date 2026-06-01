export type PhotoCategory =
  | "Exterieur"
  | "Piscine"
  | "Chambres"
  | "Salon"
  | "Cuisine"
  | "Jardin"
  | "Espace enfant"
  | "Salle de sport";

export type AvailabilityStatus = "Disponible" | "Reserve" | "Maintenance" | "Bloque";

export type BookingStatus =
  | "Nouveau"
  | "Contacte"
  | "Confirme"
  | "Refuse"
  | "Archive";

export type SiteSettings = {
  id: string;
  villa_name: string;
  slogan: string;
  whatsapp_number: string;
  messenger_name: string;
  hero_title: string;
  hero_subtitle: string;
  presentation_text: string;
  experience_text: string;
  location_text: string;
  contact_text: string;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
  keywords: string;
  show_calendar: boolean;
  updated_at: string;
};

export type Photo = {
  id: string;
  title: string;
  category: PhotoCategory;
  image_url: string;
  storage_path: string | null;
  is_published: boolean;
  is_hero: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Amenity = {
  id: string;
  name: string;
  description: string;
  icon: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type AvailabilityBlock = {
  id: string;
  start_date: string;
  end_date: string;
  status: AvailabilityStatus;
  note: string;
  created_at: string;
  updated_at: string;
};

export type BookingRequest = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  message: string;
  status: BookingStatus;
  source: string;
  created_at: string;
  updated_at: string;
};
