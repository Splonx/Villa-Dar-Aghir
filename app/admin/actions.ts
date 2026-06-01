"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/guards";
import {
  createAmenity,
  createAvailabilityBlock,
  createPhoto,
  deleteAmenity,
  deleteAvailabilityBlock,
  deletePhoto,
  saveSiteSettings,
  updateAmenity,
  updateBookingStatus,
  updatePhoto,
} from "@/lib/data/store";
import {
  amenitySchema,
  availabilitySchema,
  bookingStatusSchema,
  photoSchema,
  seoSchema,
  siteSettingsSchema,
} from "@/lib/validators";

function checkboxValue(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function clean(value: FormDataEntryValue | null) {
  return (value ?? "").toString().trim();
}

export async function upsertContentSettingsAction(formData: FormData) {
  await requireAdminSession();

  const parsed = siteSettingsSchema.parse({
    villa_name: clean(formData.get("villa_name")),
    slogan: clean(formData.get("slogan")),
    whatsapp_number: clean(formData.get("whatsapp_number")),
    messenger_name: clean(formData.get("messenger_name")),
    hero_title: clean(formData.get("hero_title")),
    hero_subtitle: clean(formData.get("hero_subtitle")),
    presentation_text: clean(formData.get("presentation_text")),
    experience_text: clean(formData.get("experience_text")),
    location_text: clean(formData.get("location_text")),
    contact_text: clean(formData.get("contact_text")),
    show_calendar: checkboxValue(formData.get("show_calendar")),
  });

  await saveSiteSettings(parsed);
  revalidatePath("/");
  revalidatePath("/villa");
  revalidatePath("/localisation");
  revalidatePath("/contact");
  revalidatePath("/admin/contenu");
}

export async function upsertSeoSettingsAction(formData: FormData) {
  await requireAdminSession();

  const parsed = seoSchema.parse({
    meta_title: clean(formData.get("meta_title")),
    meta_description: clean(formData.get("meta_description")),
    og_title: clean(formData.get("og_title")),
    og_description: clean(formData.get("og_description")),
    og_image_url: clean(formData.get("og_image_url")),
    keywords: clean(formData.get("keywords")),
  });

  await saveSiteSettings(parsed);
  revalidatePath("/");
  revalidatePath("/admin/seo");
}

export async function createAmenityAction(formData: FormData) {
  await requireAdminSession();

  const parsed = amenitySchema.parse({
    name: clean(formData.get("name")),
    description: clean(formData.get("description")),
    icon: clean(formData.get("icon")),
    is_active: checkboxValue(formData.get("is_active")),
  });

  await createAmenity(parsed);
  revalidatePath("/");
  revalidatePath("/villa");
  revalidatePath("/admin/equipements");
}

export async function updateAmenityAction(formData: FormData) {
  await requireAdminSession();

  const id = clean(formData.get("id"));
  if (!id) return;

  const parsed = amenitySchema.parse({
    name: clean(formData.get("name")),
    description: clean(formData.get("description")),
    icon: clean(formData.get("icon")),
    is_active: checkboxValue(formData.get("is_active")),
  });

  await updateAmenity(id, parsed);
  revalidatePath("/");
  revalidatePath("/villa");
  revalidatePath("/admin/equipements");
}

export async function deleteAmenityAction(formData: FormData) {
  await requireAdminSession();

  const id = clean(formData.get("id"));
  if (!id) return;

  await deleteAmenity(id);
  revalidatePath("/");
  revalidatePath("/villa");
  revalidatePath("/admin/equipements");
}

export async function createPhotoAction(formData: FormData) {
  await requireAdminSession();

  const parsed = photoSchema.parse({
    title: clean(formData.get("title")),
    category: clean(formData.get("category")),
    image_url: clean(formData.get("image_url")),
    is_published: checkboxValue(formData.get("is_published")),
    is_hero: checkboxValue(formData.get("is_hero")),
    sort_order: clean(formData.get("sort_order")) || "0",
  });

  await createPhoto(parsed);
  revalidatePath("/");
  revalidatePath("/galerie");
  revalidatePath("/admin/photos");
}

export async function updatePhotoAction(formData: FormData) {
  await requireAdminSession();

  const id = clean(formData.get("id"));
  if (!id) return;

  const parsed = photoSchema.parse({
    title: clean(formData.get("title")),
    category: clean(formData.get("category")),
    image_url: clean(formData.get("image_url")),
    is_published: checkboxValue(formData.get("is_published")),
    is_hero: checkboxValue(formData.get("is_hero")),
    sort_order: clean(formData.get("sort_order")) || "0",
  });

  await updatePhoto(id, parsed);
  revalidatePath("/");
  revalidatePath("/galerie");
  revalidatePath("/admin/photos");
}

export async function deletePhotoAction(formData: FormData) {
  await requireAdminSession();

  const id = clean(formData.get("id"));
  if (!id) return;

  await deletePhoto(id);
  revalidatePath("/");
  revalidatePath("/galerie");
  revalidatePath("/admin/photos");
}

export async function createAvailabilityAction(formData: FormData) {
  await requireAdminSession();

  const parsed = availabilitySchema.parse({
    start_date: clean(formData.get("start_date")),
    end_date: clean(formData.get("end_date")),
    status: clean(formData.get("status")),
    note: clean(formData.get("note")),
  });

  await createAvailabilityBlock(parsed);
  revalidatePath("/admin/disponibilites");
  revalidatePath("/");
  revalidatePath("/contact");
}

export async function deleteAvailabilityAction(formData: FormData) {
  await requireAdminSession();

  const id = clean(formData.get("id"));
  if (!id) return;

  await deleteAvailabilityBlock(id);
  revalidatePath("/admin/disponibilites");
  revalidatePath("/");
  revalidatePath("/contact");
}

export async function updateBookingStatusAction(formData: FormData) {
  await requireAdminSession();

  const id = clean(formData.get("id"));
  if (!id) return;

  const status = bookingStatusSchema.parse(clean(formData.get("status")));
  await updateBookingStatus(id, status);
  revalidatePath("/admin/demandes");
  revalidatePath("/admin/dashboard");
}

export async function logoutAdminAction() {
  await requireAdminSession();
  redirect("/api/admin/logout");
}
