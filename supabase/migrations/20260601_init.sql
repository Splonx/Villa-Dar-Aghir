-- L'oasis Villa initial schema
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key,
  villa_name text not null,
  slogan text not null,
  whatsapp_number text not null,
  messenger_name text not null,
  hero_title text not null,
  hero_subtitle text not null,
  presentation_text text not null,
  experience_text text not null,
  location_text text not null,
  contact_text text not null,
  meta_title text not null,
  meta_description text not null,
  og_title text not null,
  og_description text not null,
  og_image_url text not null,
  keywords text not null default '',
  show_calendar boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Exterieur','Piscine','Chambres','Salon','Cuisine','Jardin','Espace enfant','Salle de sport')),
  image_url text not null,
  storage_path text,
  is_published boolean not null default true,
  is_hero boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.amenities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  icon text not null,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.availability_blocks (
  id uuid primary key default gen_random_uuid(),
  start_date date not null,
  end_date date not null,
  status text not null check (status in ('Disponible','Reserve','Maintenance','Bloque')),
  note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  start_date date not null,
  end_date date not null,
  adults int not null default 1,
  children int not null default 0,
  message text not null,
  status text not null default 'Nouveau' check (status in ('Nouveau','Contacte','Confirme','Refuse','Archive')),
  source text not null default 'site web',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.photos enable row level security;
alter table public.amenities enable row level security;
alter table public.availability_blocks enable row level security;
alter table public.booking_requests enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- public read
create policy if not exists "public read site settings"
  on public.site_settings for select
  using (true);

create policy if not exists "public read published photos"
  on public.photos for select
  using (is_published = true);

create policy if not exists "public read active amenities"
  on public.amenities for select
  using (is_active = true);

create policy if not exists "public read availability"
  on public.availability_blocks for select
  using (true);

-- booking request public insert only
create policy if not exists "public insert booking requests"
  on public.booking_requests for insert
  with check (true);

-- admin full access
create policy if not exists "admin manage site settings"
  on public.site_settings for all
  using (public.is_admin())
  with check (public.is_admin());

create policy if not exists "admin manage photos"
  on public.photos for all
  using (public.is_admin())
  with check (public.is_admin());

create policy if not exists "admin manage amenities"
  on public.amenities for all
  using (public.is_admin())
  with check (public.is_admin());

create policy if not exists "admin manage availability"
  on public.availability_blocks for all
  using (public.is_admin())
  with check (public.is_admin());

create policy if not exists "admin read update booking requests"
  on public.booking_requests for all
  using (public.is_admin())
  with check (public.is_admin());

create policy if not exists "admin manage profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

insert into public.site_settings (
  id,
  villa_name,
  slogan,
  whatsapp_number,
  messenger_name,
  hero_title,
  hero_subtitle,
  presentation_text,
  experience_text,
  location_text,
  contact_text,
  meta_title,
  meta_description,
  og_title,
  og_description,
  og_image_url,
  keywords,
  show_calendar
)
values (
  'default',
  'L''oasis Villa',
  'Villa djerbienne privee - esprit chic et authentique',
  '0033641991176',
  'L''oasis Villa',
  'Villa djerbienne privee a 5 min de la plage d''Aghir',
  'Piscine privee, jardin arbore, espace enfant et confort moderne au coeur de Djerba.',
  'Villa djerbienne privee sans vis-a-vis avec piscine, jardin, salon traditionnel et chambres climatisees.',
  'Un sejour pense pour les familles et les groupes d''amis avec calme, intimite et prestations completes.',
  'Aghir, Djerba. A 5 min de la plage, 15 min de Midoun et Houmt Souk.',
  'Reservation ouverte toute l''annee. Contactez-nous sur WhatsApp ou Messenger pour une reponse rapide.',
  'L''oasis Villa - Location villa privee avec piscine a Djerba',
  'Villa djerbienne sans vis-a-vis a Aghir, Djerba. Piscine privee, jardin, espace enfant, salle de sport, a 5 min de la plage.',
  'L''oasis Villa - Sejour premium a Djerba',
  'Villa privee premium a Djerba avec piscine, jardin, espace enfant et reservation toute l''annee.',
  '/images/villa/villa-15.jpeg',
  'villa djerba, location villa aghir, villa piscine djerba',
  false
)
on conflict (id) do update
set updated_at = now();

insert into public.amenities (name, description, icon, is_active, sort_order)
values
  ('Piscine privee', 'Piscine exterieure reservee a la villa', 'waves', true, 0),
  ('Jardin arbore', 'Espace vert naturel et ombrage', 'trees', true, 1),
  ('Sans vis-a-vis', 'Intimite totale pour votre sejour', 'shield', true, 2),
  ('Espace enfant', 'Zone securisee pour enfants', 'toy-brick', true, 3),
  ('Salle de sport', 'Equipements fitness de base', 'dumbbell', true, 4),
  ('Cuisine equipee', 'Cuisine complete pour cuisiner librement', 'chef-hat', true, 5),
  ('Climatisation', 'Climatisation dans les chambres', 'snowflake', true, 6),
  ('Salon traditionnel', 'Ambiance djerbienne authentique', 'sofa', true, 7),
  ('Parking', 'Stationnement sur place', 'car', true, 8),
  ('A 5 min de la plage', 'Acces rapide a la plage d''Aghir', 'map-pin', true, 9)
on conflict do nothing;

insert into public.photos (title, category, image_url, is_published, is_hero, sort_order)
values
  ('Piscine signature', 'Piscine', '/images/villa/villa-15.jpeg', true, true, 0),
  ('Facade principale', 'Exterieur', '/images/villa/villa-04.jpeg', true, false, 1),
  ('Piscine privee vue aerienne', 'Piscine', '/images/villa/villa-15.jpeg', true, false, 2),
  ('Cuisine equipee', 'Cuisine', '/images/villa/villa-14.jpeg', true, false, 3),
  ('Jardin et oliviers', 'Jardin', '/images/villa/villa-12.jpeg', true, false, 4),
  ('Espace enfant', 'Espace enfant', '/images/villa/villa-08.jpeg', true, false, 5),
  ('Vue exterieure 1', 'Exterieur', '/images/villa/villa-01.jpeg', true, false, 6),
  ('Vue exterieure 2', 'Exterieur', '/images/villa/villa-02.jpeg', true, false, 7),
  ('Salon traditionnel 1', 'Salon', '/images/villa/villa-03.jpeg', true, false, 8),
  ('Chambre 1', 'Chambres', '/images/villa/villa-05.jpeg', true, false, 9),
  ('Chambre 2', 'Chambres', '/images/villa/villa-06.jpeg', true, false, 10),
  ('Salon traditionnel 2', 'Salon', '/images/villa/villa-07.jpeg', true, false, 11),
  ('Piscine 2', 'Piscine', '/images/villa/villa-09.jpeg', true, false, 12),
  ('Piscine 3', 'Piscine', '/images/villa/villa-10.jpeg', true, false, 13),
  ('Cuisine 2', 'Cuisine', '/images/villa/villa-11.jpeg', true, false, 14),
  ('Jardin 2', 'Jardin', '/images/villa/villa-13.jpeg', true, false, 15),
  ('Chambre 3', 'Chambres', '/images/villa/villa-16.jpeg', true, false, 16),
  ('Salon 3', 'Salon', '/images/villa/villa-17.jpeg', true, false, 17),
  ('Vue exterieure 3', 'Exterieur', '/images/villa/villa-18.jpeg', true, false, 18)
on conflict do nothing;

insert into storage.buckets (id, name, public)
values ('villa-photos', 'villa-photos', true)
on conflict (id) do nothing;

create policy if not exists "public read villa photos storage"
  on storage.objects for select
  using (bucket_id = 'villa-photos');

create policy if not exists "admin manage villa photos storage"
  on storage.objects for all
  using (bucket_id = 'villa-photos' and public.is_admin())
  with check (bucket_id = 'villa-photos' and public.is_admin());


