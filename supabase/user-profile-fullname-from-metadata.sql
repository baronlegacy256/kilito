-- Optional: copy display name from auth metadata into user_profiles on signup.
-- Run after user-auth-schema.sql

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_full text;
begin
  v_full := coalesce(
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    nullif(
      trim(
        coalesce(new.raw_user_meta_data->>'first_name', '')
        || ' '
        || coalesce(new.raw_user_meta_data->>'last_name', '')
      ),
      ''
    )
  );

  insert into public.user_profiles (user_id, full_name)
  values (new.id, v_full)
  on conflict (user_id) do update
    set full_name = coalesce(excluded.full_name, public.user_profiles.full_name);

  return new;
end;
$$;
