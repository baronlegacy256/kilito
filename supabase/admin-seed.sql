-- Optional legacy: links a Supabase Auth user to admin RLS policies.
-- The Next.js admin dashboard now uses env-based admin login + service role instead,
-- so you do not need auth.users or this row for /admin unless you still use old flows.

insert into public.admin_profiles (user_id, full_name, is_active)
select u.id, 'Main Admin', true
from auth.users u
where u.email = 'info@kilitosavannasafariclub.com'
on conflict (user_id) do update set
  is_active = excluded.is_active,
  full_name = excluded.full_name;
