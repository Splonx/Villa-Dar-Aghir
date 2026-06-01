import { z } from "zod";

export const bookingRequestSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().optional().or(z.literal("")),
  start_date: z.string().date(),
  end_date: z.string().date(),
  adults: z.number().int().min(1).max(20),
  children: z.number().int().min(0).max(20),
  message: z.string().trim().min(5).max(2000),
});

export const siteSettingsSchema = z.object({
  villa_name: z.string().trim().min(2).max(120),
  slogan: z.string().trim().min(2).max(160),
  whatsapp_number: z.string().trim().min(6).max(30),
  messenger_name: z.string().trim().min(2).max(80),
  hero_title: z.string().trim().min(8).max(160),
  hero_subtitle: z.string().trim().min(8).max(260),
  presentation_text: z.string().trim().min(20).max(5000),
  experience_text: z.string().trim().min(20).max(5000),
  location_text: z.string().trim().min(10).max(2000),
  contact_text: z.string().trim().min(10).max(2000),
  show_calendar: z.coerce.boolean(),
});

export const seoSchema = z.object({
  meta_title: z.string().trim().min(8).max(160),
  meta_description: z.string().trim().min(20).max(320),
  og_title: z.string().trim().min(8).max(160),
  og_description: z.string().trim().min(20).max(320),
  og_image_url: z.string().trim().min(1).max(500),
  keywords: z.string().trim().min(3).max(500),
});

export const amenitySchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(5).max(200),
  icon: z.string().trim().min(2).max(50),
  is_active: z.coerce.boolean(),
});

export const photoSchema = z.object({
  title: z.string().trim().min(2).max(120),
  category: z.enum([
    "Exterieur",
    "Piscine",
    "Chambres",
    "Salon",
    "Cuisine",
    "Jardin",
    "Espace enfant",
    "Salle de sport",
  ]),
  image_url: z.string().trim().min(1).max(500),
  is_published: z.coerce.boolean(),
  is_hero: z.coerce.boolean(),
  sort_order: z.coerce.number().int().min(0).max(9999),
});

export const availabilitySchema = z.object({
  start_date: z.string().date(),
  end_date: z.string().date(),
  status: z.enum(["Disponible", "Reserve", "Maintenance", "Bloque"]),
  note: z.string().trim().max(200).optional().or(z.literal("")),
});

export const bookingStatusSchema = z.enum([
  "Nouveau",
  "Contacte",
  "Confirme",
  "Refuse",
  "Archive",
]);
