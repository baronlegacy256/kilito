-- Create bookings table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  package_id uuid references public.packages(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  num_travelers int default 1,
  start_date date,
  special_requests text,
  status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Cancelled', 'Followed Up')),
  type text not null default 'Booking' check (type in ('Booking', 'Quote')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Security policies
alter table public.bookings enable row level security;

-- Allow anonymous and authenticated users to insert bookings
create policy "Anyone can create a booking"
on public.bookings for insert
to anon, authenticated
with check (true);

-- Allow admins to see and manage all bookings
create policy "Admins can manage all bookings"
on public.bookings for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Allow users to see their own bookings
create policy "Users can see their own bookings"
on public.bookings for select
to authenticated
using (auth.uid() = user_id);
