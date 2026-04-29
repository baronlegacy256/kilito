create table if not exists public.package_stays (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  start_date date not null,
  end_date date,
  status text not null default 'Open' check (status in ('Open', 'Full', 'Closed', 'Cancelled')),
  min_participants int default 1,
  max_participants int,
  current_participants int default 0,
  price_override numeric(12,2),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_package_stays_package_id on public.package_stays(package_id, start_date);

-- Security policies
alter table public.package_stays enable row level security;

drop policy if exists "Public read package_stays" on public.package_stays;
create policy "Public read package_stays"
on public.package_stays for select
to anon, authenticated
using (
  exists (
    select 1 from public.packages p
    where p.id = package_stays.package_id and p.is_active = true
  )
);

drop policy if exists "Admin write package_stays" on public.package_stays;
create policy "Admin write package_stays"
on public.package_stays for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));
