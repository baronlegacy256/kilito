-- Seed data for one package detail page
-- Run this after: supabase/package-details-schema.sql

insert into public.packages (
  slug,
  title,
  subtitle,
  top_background_image,
  duration_label,
  technical_level_label,
  technical_level_note,
  physical_level_label,
  physical_level_note,
  max_group_size_label,
  season_from,
  season_to,
  hero_description_html,
  meeting_point,
  itinerary_intro_html,
  is_active
)
values (
  'southern-tanzania-safari-zanzibar',
  'Safari in Southern Tanzania: Selous & Zanzibar',
  'Explore Selous Parks, Mikumi & Saadani Game Reserve wild safari',
  'https://media.kazaden.com/imgth/1280x960/img/activity_school/4614/n-0773-ncz8200-a3.jpg',
  '8 days',
  'Suitable for all',
  'Trip suitable for both first-time and experienced travelers.',
  'Suitable for all',
  'Works for normal fitness levels; activities are moderate.',
  '8 people',
  'June',
  'September',
  '<p>Discover Southern Tanzania with a curated safari route combining wildlife, culture, and coastal relaxation.</p><p>This package is designed for travelers who want immersive game drives and flexible pacing.</p>',
  'Dar es Salaam, Tanzania',
  '<p><strong>This itinerary is indicative.</strong> Final routing may vary due to weather, road conditions, and park regulations.</p>',
  true
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  top_background_image = excluded.top_background_image,
  duration_label = excluded.duration_label,
  technical_level_label = excluded.technical_level_label,
  technical_level_note = excluded.technical_level_note,
  physical_level_label = excluded.physical_level_label,
  physical_level_note = excluded.physical_level_note,
  max_group_size_label = excluded.max_group_size_label,
  season_from = excluded.season_from,
  season_to = excluded.season_to,
  hero_description_html = excluded.hero_description_html,
  meeting_point = excluded.meeting_point,
  itinerary_intro_html = excluded.itinerary_intro_html,
  is_active = excluded.is_active;

delete from public.package_carousel_images
where package_id = (
  select id from public.packages where slug = 'southern-tanzania-safari-zanzibar'
);

insert into public.package_carousel_images (package_id, image_url, alt_text, sort_order)
select
  (select id from public.packages where slug = 'southern-tanzania-safari-zanzibar'),
  x.image_url,
  x.alt_text,
  x.sort_order
from (
  values
    ('https://media.kazaden.com/imgth/1280x960/img/activity_school/4614/n-0773-ncz8200-a3.jpg', 'Safari landscape', 1),
    ('https://media.kazaden.com/imgth/1280x960/img/activity_school/4614/Gr-ce_Catamaran-%28c%29daria-nepriakhina-1Pf0mcNlazs-unsplash.jpg', 'Travel moment', 2),
    ('https://media.kazaden.com/imgth/1280x960/img/activity_school/4614/Gr-ce_Cyclades_Paros-%28c%29-160866001-N07-48419815986_111a0ebb97_o-%281%29.jpg', 'Destination view', 3)
) as x(image_url, alt_text, sort_order);

delete from public.package_pricing_tiers
where package_id = (
  select id from public.packages where slug = 'southern-tanzania-safari-zanzibar'
);

insert into public.package_pricing_tiers (
  package_id,
  label,
  min_group_size,
  max_group_size,
  price_amount,
  currency_code,
  per_label,
  sort_order
)
select
  (select id from public.packages where slug = 'southern-tanzania-safari-zanzibar'),
  x.label,
  x.min_group_size,
  x.max_group_size,
  x.price_amount,
  x.currency_code,
  x.per_label,
  x.sort_order
from (
  values
    ('Group of 2', 2, 2, 1850.00, 'USD', 'per person', 1),
    ('Group of 3', 3, 3, 1750.00, 'USD', 'per person', 2),
    ('Group of 4', 4, 4, 1550.00, 'USD', 'per person', 3),
    ('Private premium (EUR)', 2, 6, 1600.00, 'EUR', 'per person', 4)
) as x(label, min_group_size, max_group_size, price_amount, currency_code, per_label, sort_order);

delete from public.package_itinerary_days
where package_id = (
  select id from public.packages where slug = 'southern-tanzania-safari-zanzibar'
);

insert into public.package_itinerary_days (
  package_id,
  day_label,
  title,
  description_html,
  duration_note,
  image_url,
  sort_order
)
select
  (select id from public.packages where slug = 'southern-tanzania-safari-zanzibar'),
  x.day_label,
  x.title,
  x.description_html,
  x.duration_note,
  x.image_url,
  x.sort_order
from (
  values
    ('Day 1', 'Arrival and briefing', '<p>Arrival in Dar es Salaam, meet your local team, and receive your safari briefing.</p>', '2h transfers', 'https://media.kazaden.com/imgth/612x345/img/activity_school/4614/Gr-ce_Catamaran-%28c%29daria-nepriakhina-1Pf0mcNlazs-unsplash.jpg', 1),
    ('Day 2', 'Selous game drives', '<p>Morning and afternoon game drives in Selous with a professional guide.</p>', '6h game drive', 'https://media.kazaden.com/imgth/612x345/img/activity_school/4614/Gr-ce_Cyclades_Paros-%28c%29-160866001-N07-48419815986_111a0ebb97_o-%281%29.jpg', 2),
    ('Day 3', 'River excursion', '<p>Boat safari and riverside wildlife observation at sunset.</p>', '4h on water', null, 3),
    ('Day 4', 'Transfer to Mikumi', '<p>Scenic transfer and optional evening cultural stop.</p>', '5h transfer', null, 4)
) as x(day_label, title, description_html, duration_note, image_url, sort_order);

delete from public.package_practical_information
where package_id = (
  select id from public.packages where slug = 'southern-tanzania-safari-zanzibar'
);

insert into public.package_practical_information (
  package_id,
  question,
  answer_html,
  sort_order
)
select
  (select id from public.packages where slug = 'southern-tanzania-safari-zanzibar'),
  x.question,
  x.answer_html,
  x.sort_order
from (
  values
    ('How do I reach the meeting point?', '<p>Fly into Dar es Salaam. Airport pickup can be arranged on request.</p>', 1),
    ('Can the itinerary change?', '<p>Yes. Weather, wildlife movement, and local conditions may require adjustments for safety and best experience.</p>', 2),
    ('What should I pack?', '<p>Bring light layers, sun protection, closed shoes, and your travel documents.</p>', 3),
    ('Do I need insurance?', '<p>Comprehensive travel insurance is strongly recommended before departure.</p>', 4)
) as x(question, answer_html, sort_order);
