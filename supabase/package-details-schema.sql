create extension if not exists "pgcrypto";

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  top_background_image text,
  duration_label text,
  technical_level_label text,
  technical_level_note text,
  physical_level_label text,
  physical_level_note text,
  max_group_size_label text,
  season_from text,
  season_to text,
  hero_description_html text,
  meeting_point text,
  itinerary_intro_html text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.package_carousel_images (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.package_pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  label text not null,
  min_group_size int,
  max_group_size int,
  price_amount numeric(12,2) not null,
  currency_code text not null check (currency_code in ('USD', 'EUR')),
  per_label text default 'per person',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.package_itinerary_days (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  day_label text not null,
  title text not null,
  description_html text not null,
  duration_note text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.package_practical_information (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  question text not null,
  answer_html text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references auth.users(id) on delete cascade,
  full_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_packages_updated_at on public.packages;
create trigger trg_packages_updated_at
before update on public.packages
for each row execute function public.set_updated_at();

create index if not exists idx_package_carousel_images_package_id
  on public.package_carousel_images(package_id, sort_order);
create index if not exists idx_package_pricing_tiers_package_id
  on public.package_pricing_tiers(package_id, sort_order);
create index if not exists idx_package_itinerary_days_package_id
  on public.package_itinerary_days(package_id, sort_order);
create index if not exists idx_package_practical_information_package_id
  on public.package_practical_information(package_id, sort_order);

alter table public.packages enable row level security;
alter table public.package_carousel_images enable row level security;
alter table public.package_pricing_tiers enable row level security;
alter table public.package_itinerary_days enable row level security;
alter table public.package_practical_information enable row level security;
alter table public.admin_profiles enable row level security;

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles ap
    where ap.user_id = uid
      and ap.is_active = true
  );
$$;

drop policy if exists "Public read packages" on public.packages;
create policy "Public read packages"
on public.packages for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public read package_carousel_images" on public.package_carousel_images;
create policy "Public read package_carousel_images"
on public.package_carousel_images for select
to anon, authenticated
using (
  exists (
    select 1 from public.packages p
    where p.id = package_carousel_images.package_id and p.is_active = true
  )
);

drop policy if exists "Public read package_pricing_tiers" on public.package_pricing_tiers;
create policy "Public read package_pricing_tiers"
on public.package_pricing_tiers for select
to anon, authenticated
using (
  exists (
    select 1 from public.packages p
    where p.id = package_pricing_tiers.package_id and p.is_active = true
  )
);

drop policy if exists "Public read package_itinerary_days" on public.package_itinerary_days;
create policy "Public read package_itinerary_days"
on public.package_itinerary_days for select
to anon, authenticated
using (
  exists (
    select 1 from public.packages p
    where p.id = package_itinerary_days.package_id and p.is_active = true
  )
);

drop policy if exists "Public read package_practical_information" on public.package_practical_information;
create policy "Public read package_practical_information"
on public.package_practical_information for select
to anon, authenticated
using (
  exists (
    select 1 from public.packages p
    where p.id = package_practical_information.package_id and p.is_active = true
  )
);

drop policy if exists "Admins read own profile" on public.admin_profiles;
create policy "Admins read own profile"
on public.admin_profiles for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Admin write packages" on public.packages;
create policy "Admin write packages"
on public.packages for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admin write package_carousel_images" on public.package_carousel_images;
create policy "Admin write package_carousel_images"
on public.package_carousel_images for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admin write package_pricing_tiers" on public.package_pricing_tiers;
create policy "Admin write package_pricing_tiers"
on public.package_pricing_tiers for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admin write package_itinerary_days" on public.package_itinerary_days;
create policy "Admin write package_itinerary_days"
on public.package_itinerary_days for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admin write package_practical_information" on public.package_practical_information;
create policy "Admin write package_practical_information"
on public.package_practical_information for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public)
values ('package-media', 'package-media', true)
on conflict (id) do nothing;

drop policy if exists "Public read package media" on storage.objects;
create policy "Public read package media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'package-media');

drop policy if exists "Admin upload package media" on storage.objects;
create policy "Admin upload package media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'package-media'
  and public.is_admin(auth.uid())
);

drop policy if exists "Admin update package media" on storage.objects;
create policy "Admin update package media"
on storage.objects for update
to authenticated
using (
  bucket_id = 'package-media'
  and public.is_admin(auth.uid())
)
with check (
  bucket_id = 'package-media'
  and public.is_admin(auth.uid())
);

drop policy if exists "Admin delete package media" on storage.objects;
create policy "Admin delete package media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'package-media'
  and public.is_admin(auth.uid())
);
