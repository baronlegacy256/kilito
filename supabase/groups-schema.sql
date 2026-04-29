-- Create groups table
create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  package_id uuid references public.packages(id) on delete cascade,
  name text,
  start_date date not null,
  end_date date,
  status text not null default 'Open' check (status in ('Open', 'Full', 'Confirmed', 'Closed', 'Cancelled')),
  min_participants int default 1,
  max_participants int,
  current_participants int default 0,
  price_override numeric(12,2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add group_id to bookings to associate bookings with specific groups
alter table public.bookings add column if not exists group_id uuid references public.groups(id) on delete set null;

-- Enable RLS
alter table public.groups enable row level security;

-- Policies
create policy "Public read groups"
on public.groups for select
to anon, authenticated
using (true);

create policy "Admin manage groups"
on public.groups for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Index for performance
create index if not exists idx_groups_package_id on public.groups(package_id);
create index if not exists idx_groups_start_date on public.groups(start_date);
create index if not exists idx_bookings_group_id on public.bookings(group_id);
