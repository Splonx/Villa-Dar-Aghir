import { randomUUID } from "node:crypto";
import {
  defaultAmenities,
  defaultAvailability,
  defaultPhotos,
  defaultSiteSettings,
} from "@/lib/fallback-data";
import { isSupabaseAdminEnabled } from "@/lib/env";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  Amenity,
  AvailabilityBlock,
  BookingRequest,
  BookingStatus,
  Photo,
  SiteSettings,
} from "@/lib/types";

let fallbackSettings: SiteSettings = { ...defaultSiteSettings };
let fallbackAmenities: Amenity[] = [...defaultAmenities];
let fallbackPhotos: Photo[] = [...defaultPhotos];
let fallbackAvailability: AvailabilityBlock[] = [...defaultAvailability];
let fallbackRequests: BookingRequest[] = [];

function nowISO() {
  return new Date().toISOString();
}

function getAdminClient() {
  return isSupabaseAdminEnabled ? getSupabaseAdminClient() : null;
}

export async function getSiteSettings() {
  const supabase = getAdminClient();
  if (!supabase) return fallbackSettings;

  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data ?? fallbackSettings;
}

export async function getPhotos(options?: {
  publishedOnly?: boolean;
  category?: string;
}) {
  const supabase = getAdminClient();
  const publishedOnly = options?.publishedOnly ?? false;

  if (!supabase) {
    return fallbackPhotos
      .filter((item) => (publishedOnly ? item.is_published : true))
      .filter((item) => (options?.category ? item.category === options.category : true))
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  let query = supabase.from("photos").select("*").order("sort_order", { ascending: true });
  if (publishedOnly) query = query.eq("is_published", true);
  if (options?.category) query = query.eq("category", options.category);

  const { data } = await query;
  return (data as Photo[] | null) ?? fallbackPhotos;
}

export async function getAmenities(activeOnly = true) {
  const supabase = getAdminClient();
  if (!supabase) {
    return fallbackAmenities
      .filter((item) => (activeOnly ? item.is_active : true))
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  let query = supabase
    .from("amenities")
    .select("*")
    .order("sort_order", { ascending: true });

  if (activeOnly) query = query.eq("is_active", true);

  const { data } = await query;
  return (data as Amenity[] | null) ?? fallbackAmenities;
}

export async function getAvailabilityBlocks() {
  const supabase = getAdminClient();
  if (!supabase) {
    return [...fallbackAvailability].sort((a, b) =>
      a.start_date.localeCompare(b.start_date),
    );
  }

  const { data } = await supabase
    .from("availability_blocks")
    .select("*")
    .order("start_date", { ascending: true });

  return (data as AvailabilityBlock[] | null) ?? fallbackAvailability;
}

export async function getBookingRequests(status?: BookingStatus | "Tous") {
  const supabase = getAdminClient();
  if (!supabase) {
    const filtered =
      !status || status === "Tous"
        ? fallbackRequests
        : fallbackRequests.filter((entry) => entry.status === status);
    return [...filtered].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  let query = supabase
    .from("booking_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "Tous") {
    query = query.eq("status", status);
  }

  const { data } = await query;
  return (data as BookingRequest[] | null) ?? [];
}

export async function getDashboardStats() {
  const [requests, photos, availability] = await Promise.all([
    getBookingRequests(),
    getPhotos(),
    getAvailabilityBlocks(),
  ]);

  const newest = requests.slice(0, 5);
  const currentStatus = availability[0]?.status ?? "Disponible";

  return {
    requestCount: requests.length,
    latestRequests: newest,
    photoCount: photos.filter((item) => item.is_published).length,
    currentAvailabilityStatus: currentStatus,
  };
}

export async function createBookingRequest(
  payload: Omit<BookingRequest, "id" | "created_at" | "updated_at" | "status" | "source">,
) {
  const row = {
    ...payload,
    status: "Nouveau" as BookingStatus,
    source: "site web",
  };

  const supabase = getAdminClient();
  if (!supabase) {
    fallbackRequests = [
      {
        ...row,
        id: randomUUID(),
        created_at: nowISO(),
        updated_at: nowISO(),
      },
      ...fallbackRequests,
    ];
    return;
  }

  await supabase.from("booking_requests").insert(row);
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const supabase = getAdminClient();
  if (!supabase) {
    fallbackRequests = fallbackRequests.map((entry) =>
      entry.id === id ? { ...entry, status, updated_at: nowISO() } : entry,
    );
    return;
  }

  await supabase
    .from("booking_requests")
    .update({ status, updated_at: nowISO() })
    .eq("id", id);
}

export async function saveSiteSettings(payload: Partial<SiteSettings>) {
  const supabase = getAdminClient();
  if (!supabase) {
    fallbackSettings = { ...fallbackSettings, ...payload, updated_at: nowISO() };
    return;
  }

  const existing = await getSiteSettings();
  const merged = { ...existing, ...payload, updated_at: nowISO() };

  await supabase.from("site_settings").upsert(merged, { onConflict: "id" });
}

export async function createAmenity(payload: Partial<Amenity>) {
  const row = {
    name: payload.name ?? "Nouvel equipement",
    description: payload.description ?? "Description",
    icon: payload.icon ?? "sparkles",
    is_active: payload.is_active ?? true,
    sort_order: payload.sort_order ?? 99,
  };

  const supabase = getAdminClient();
  if (!supabase) {
    fallbackAmenities.push({
      id: randomUUID(),
      created_at: nowISO(),
      updated_at: nowISO(),
      ...row,
    });
    return;
  }

  await supabase.from("amenities").insert(row);
}

export async function updateAmenity(id: string, payload: Partial<Amenity>) {
  const supabase = getAdminClient();
  if (!supabase) {
    fallbackAmenities = fallbackAmenities.map((item) =>
      item.id === id ? { ...item, ...payload, updated_at: nowISO() } : item,
    );
    return;
  }

  await supabase.from("amenities").update(payload).eq("id", id);
}

export async function deleteAmenity(id: string) {
  const supabase = getAdminClient();
  if (!supabase) {
    fallbackAmenities = fallbackAmenities.filter((item) => item.id !== id);
    return;
  }

  await supabase.from("amenities").delete().eq("id", id);
}

export async function createPhoto(payload: Partial<Photo>) {
  const row = {
    title: payload.title ?? "Nouvelle photo",
    category: payload.category ?? "Exterieur",
    image_url: payload.image_url ?? "/images/villa/hero.svg",
    storage_path: payload.storage_path ?? null,
    is_published: payload.is_published ?? true,
    is_hero: payload.is_hero ?? false,
    sort_order: payload.sort_order ?? 99,
  };

  const supabase = getAdminClient();
  if (!supabase) {
    fallbackPhotos.push({
      id: randomUUID(),
      created_at: nowISO(),
      updated_at: nowISO(),
      ...row,
    });
    return;
  }

  if (row.is_hero) {
    await supabase
      .from("photos")
      .update({ is_hero: false, updated_at: nowISO() })
      .eq("is_hero", true);
  }

  await supabase.from("photos").insert(row);
}

export async function updatePhoto(id: string, payload: Partial<Photo>) {
  const supabase = getAdminClient();
  if (!supabase) {
    if (payload.is_hero) {
      fallbackPhotos = fallbackPhotos.map((photo) => ({ ...photo, is_hero: false }));
    }
    fallbackPhotos = fallbackPhotos.map((item) =>
      item.id === id ? { ...item, ...payload, updated_at: nowISO() } : item,
    );
    return;
  }

  if (payload.is_hero) {
    await supabase
      .from("photos")
      .update({ is_hero: false, updated_at: nowISO() })
      .eq("is_hero", true);
  }

  await supabase
    .from("photos")
    .update({ ...payload, updated_at: nowISO() })
    .eq("id", id);
}

export async function deletePhoto(id: string) {
  const supabase = getAdminClient();
  if (!supabase) {
    fallbackPhotos = fallbackPhotos.filter((item) => item.id !== id);
    return;
  }

  await supabase.from("photos").delete().eq("id", id);
}

export async function createAvailabilityBlock(payload: Partial<AvailabilityBlock>) {
  const row = {
    start_date: payload.start_date,
    end_date: payload.end_date,
    status: payload.status ?? "Bloque",
    note: payload.note ?? "",
  };

  const supabase = getAdminClient();
  if (!supabase) {
    fallbackAvailability.push({
      id: randomUUID(),
      created_at: nowISO(),
      updated_at: nowISO(),
      start_date: row.start_date ?? new Date().toISOString().slice(0, 10),
      end_date: row.end_date ?? new Date().toISOString().slice(0, 10),
      status: row.status as AvailabilityBlock["status"],
      note: row.note,
    });
    return;
  }

  await supabase.from("availability_blocks").insert(row);
}

export async function deleteAvailabilityBlock(id: string) {
  const supabase = getAdminClient();
  if (!supabase) {
    fallbackAvailability = fallbackAvailability.filter((item) => item.id !== id);
    return;
  }

  await supabase.from("availability_blocks").delete().eq("id", id);
}

export async function getHeroPhoto() {
  const photos = await getPhotos({ publishedOnly: true });
  return photos.find((photo) => photo.is_hero) ?? photos[0] ?? defaultPhotos[0];
}
