-- Partner applications (footer "Become a partner" form)
create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  country text,
  website text,
  business_type text not null,
  message text,
  status text not null default 'Pending'
    check (status in ('Pending', 'Contacted', 'Approved', 'Rejected')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_partner_applications_status
  on public.partner_applications (status);

create index if not exists idx_partner_applications_created_at
  on public.partner_applications (created_at desc);

alter table public.partner_applications enable row level security;

-- Public can submit applications only
drop policy if exists "Anyone can submit partner application" on public.partner_applications;
create policy "Anyone can submit partner application"
  on public.partner_applications
  for insert
  to anon, authenticated
  with check (true);

-- No public read/update/delete (admin uses service role)
