-- Seed data generated from package-data.json targeting existing schema

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'day-trip-to-ngorongoro',
    'Day trip to Ngorongoro',
    'Discover the Ngorongoro Crater, one of the most spectacular natural wonders in Tanzania.',
    'Safari tour',
    '1 Day',
    'Suitable for all',
    'All year round',
    'Discover the Ngorongoro Crater, one of the most spectacular natural wonders in Tanzania. This day trip plunges you into a UNESCO World Heritage site where wildlife is concentrated in an immense volcanic caldera.',
    'Arusha, Tanzania',
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 400, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 300, 'USD', 1);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'day-trip-to-manyara',
    'Day trip to Manyara',
    'Explore Lake Manyara National Park with its diverse wildlife and stunning landscapes.',
    'Safari tour',
    '1 Day',
    'Suitable for all',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 250, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 250, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 200, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'day-trip-to-tarangire',
    'Day trip to Tarangire',
    'Experience the elephant paradise of Tarangire National Park.',
    'Safari tour',
    '1 Day',
    'Suitable for all',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 250, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 400, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 200, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'three-days-trip-tarangire-manyara-ngorongoro',
    'Three Days Trip (Tarangire, Manyara & Ngorongoro Crater)',
    'A comprehensive 3-day safari covering three of Tanzania''s most beautiful parks.',
    'Safari tour',
    '3 Days',
    'Suitable for all',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 900, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 1000, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 900, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'tented-camps-7-days-safari',
    'Tented Camps 7 Days Safari',
    'An immersive 7-day safari experience staying in comfortable tented camps.',
    'Safari tour',
    '7 Days',
    'Suitable for all',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people', 1850, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 people', 1750, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '4 people', 1550, 'USD', 2);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 people', 1450, 'USD', 3);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '6 people', 1350, 'USD', 4);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '8 people or more', 1250, 'USD', 5);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'machame-route-7-days-trekking',
    'MACHAME ROUTE (7 DAYS TREKKING)',
    'Conquer Mount Kilimanjaro via the scenic Machame route.',
    'Climbing and Trekking',
    '7 Days',
    'Suitable for all',
    NULL,
    'Kilimanjaro Climbing

Enjoy a 7-day trek to the top of Kilimanjaro via the Machame path with a group of

knowledgeable guides and neighborhood porters from Kili to savannah safari club.



One of the best routes to climb Mount Kilimanjaro is the Machame route, also known as the

“Whisky Route,” as it is the best for acclimatization and enables climbers to “walk high and

sleep low” while also having one of the greatest summit success rates of all the routes.

In order to have your tent ready when you arrive, along with a warm beverage made by our team

chef, we make sure that our porter team gets to the designated campsites early.

Contact us so that we can talk about your goals for your Kilimanjaro climbing journey. 



We would be delighted to assist you in climbing the highest peak in Africa.

We also have additional Kilimanjaro ascent paths, including the Marangu, Lemosho,

and Rongai routes.



The six days Machame variation is a difficult route. In particular, day four combined with day

five makes for a very hard schedule. Day four is a full day of hiking from Barranco to Barafu.

Then after dinner and a partial night’s sleep, the very long and strenuous summit day begins

around midnight. The 6 days Machame route requires 19-24 hours of demanding walking, at

extremely high elevation, with only 4-6 hours of sleep at Machame',
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 425, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 400, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 300, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'mt-meru-trekking',
    'Mt Meru trekking',
    'Trek to the summit of Mount Meru, Tanzania''s second highest peak.',
    'Climbing and Trekking',
    '1 Day',
    'Suitable for all',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 250, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 250, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 200, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'kilimanjaro-trekking-marangu-route',
    'Kilimanjaro Trekking-Marangu route',
    'The classic Marangu route, also known as the "Coca-Cola" route.',
    'Climbing and Trekking',
    '1 Day',
    'Suitable for all',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 250, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 400, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 200, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'kilimanjaro-lemosho-route-8-days',
    'KILIMANJARO-LEMOSHO ROUTE (8 DAYS TREKKING)',
    'The longest and most scenic route to the summit of Kilimanjaro.',
    'Climbing and Trekking',
    '8 Days',
    'Suitable for all',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people', 2200, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 people', 2100, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '4 people', 2000, 'USD', 2);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 people', 1900, 'USD', 3);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '6 people', 1800, 'USD', 4);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '8 people or more', 1700, 'USD', 5);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'singisi-village-pottery-workshop',
    'From Earth To Art Sing''isi Village Pottery Workshop Tour',
    'Learn traditional pottery making techniques in a local village.',
    'Cultural tour',
    '3 Hours',
    'Suitable for all',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '1 person', 40, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 35, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 30, 'USD', 2);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 25, 'USD', 3);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'bike-ride-tour',
    'Bike Ride Tour',
    'Explore the countryside on a guided bike tour.',
    'Cultural tour',
    '7 Days',
    'Suitable for all',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 425, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 400, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 300, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'arusha-town-tour',
    'Arusha Town Tour',
    'Discover the vibrant culture and history of Arusha town.',
    'Cultural tour',
    '1 Day',
    'Suitable for all',
    NULL,
    'Arusha National Park covers Mount Meru, a prominent volcano with an elevation of 4566 m, in

the Arusha Region of north eastern Tanzania. The park is small but varied with spectacular

landscapes in three distinct areas. In the west, the Meru Crater funnels the Jekukumia River; the

peak of Mount Meru lies on its rim. Ngurdoto Crater in the south-east is grassland. The shallow

alkaline Momella Lakes in the north-east have varying algal colors and are known for their

wading birds.



Mount Meru is the second highest peak in Tanzania after Mount Kilimanjaro, which is just 60

km away and forms a backdrop to views from the park to the east. Arusha National Park lies on a

300-kilometre axis of Africa''s most famous national parks, running from Serengeti and

Ngorongoro Crater in the west to Kilimanjaro National Park in the east.

The park is just a few kilometers north east of Arusha, though the main gate is 25 km east of the

city. It is also 58 km from Moshi and 35 km from Kilimanjaro International Airport (KIA).

Arusha National Park has a rich variety of wildlife, but visitors shouldn''t expect the same gameviewing experience they find in other national parks of Tanzania''s northern circuit. Despite the

small size of the park, common animals include giraffe, Cape buffalo, zebra, warthog, the blackand-white colobus monkey, the blue monkey, flamingo, elephant, bushbuck and many other

African animals. Leopard populations are present, but rarely seen. Birdlife in the forest is

prolific, with many forest species more easily seen here than elsewhere on the tourist route -

Narina trogon and bar-tailed trogon are both possible highlights for visiting birders,',
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 425, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 400, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 300, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'adventure-mobile-camping-5-days-safari',
    'Adventure Mobile Camping Safari(5 days Safari)',
    'This programme include safari to national park and cultural tourism as you will have time to visit

local society of Masai in their houses called (BOMA) which visitors may have new experience.',
    'Cultural tour',
    '5',
    'All Levels',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Group of 3 people', 1500, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Group of 4 people', 1300, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Group of 5 people', 1200, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'adventure-big-five-safari',
    'Tanzania Adventure Big Five Safari (6  days Safari)',
    NULL,
    'Safari tour',
    '6 Days',
    'All Levels',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Cost for a  group of 2 people', 1850, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Cost for a  group of 3 people', 1750, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Cost for a  group of 4 people', 1550, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'tanzania-adventure-big-five-luxury-safari',
    'TANZANIA ADVENTURE BIG FIVE SAFARI (7 days Luxury Safari)',
    NULL,
    'Cultural tour',
    '7 Days',
    'all levels',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Cost for a group of 2 people', 4200, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Cost for a group of 3 people', 4100, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Cost for a group of 4 people', 4000, 'USD', 2);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Cost for a group of 5 people', 3900, 'USD', 3);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Cost for a group of 6 people', 3800, 'USD', 4);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Cost for a group of 8 people', 3700, 'USD', 5);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'poland-graves-tour',
    'Poland Graves Tour',
    NULL,
    'Cultural tour',
    '1 Day',
    'All Levels',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 People Sharing', 35, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3-5 People Sharing', 30, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5-8 People Sharing', 25, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'masai-village-tour',
    'Masai Village Tour',
    NULL,
    'Cultural tour',
    '1 Day',
    'All Levels',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people', 400, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people', 300, 'USD', 1);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'mount-meru-full-day-hike',
    'Mount Meru Full Day Hike',
    NULL,
    'Cultural tour',
    '1 day',
    'All Levels',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '3 to 5 people sharing', 400, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '5 to 8 people sharing', 300, 'USD', 1);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'rain-forest-hike',
    'Rain Forest Hike',
    NULL,
    'Cultural tour',
    '1 day',
    'Alll Levels',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 3 to 5 people is', 400, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 5 t0 8 people is', 300, 'USD', 1);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'lake-daluti-forest-hike-and-canoeing',
    'Lake Daluti Forest Hike and Canoeing',
    NULL,
    'Cultural tour',
    '1 day',
    'All Levels',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 3 to 5 people is', 400, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 5 to 8 people is', 300, 'USD', 1);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'coffee-tourism-and-banana-farms-experience',
    'Coffee Tourism and Banana Farms Experience',
    'Immerse yourself in the local coffee culture and explore the lush banana farms of Tanzania. Learn how coffee is grown, harvested, and processed.',
    'Cultural tour',
    '7 Days',
    'SUITABLE FOR ALL',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 850, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 3 to 5 people', 400, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 5 to 8 people', 300, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'materuni-waterfalls-hike',
    'Materuni Waterfalls Hike',
    'A refreshing hike to the majestic Materuni Waterfalls followed by a traditional coffee experience. Perfect for nature lovers and families.',
    'Climbing and Trekking',
    '7 Days',
    'SUITABLE FOR ALL',
    NULL,
    'Hike Distance: The total distance of the hike is 8km out and back (return trip) including the walk

up to the coffee farm.

Hike Duration: The hike to and from the waterfall should take about 1.5 -2 hours but including

the coffee farm tour, you can expect the entire activity to last for 3-4 hours.

Hike Difficulty: This trail is quite manageable. Even in the rain, it was okay when we walked

slowly. It’s a muddy road, which converts into a single-track trail towards the end of the hike. As

long as you are comfortable with uneven surfaces and some slight incline, this will be a walk in

the park.

Hike Incline: 321 meters (return trip) including the coffee farms

Materuni Falls Tour – This tour includes a visit to Chemka Hot Springs in the afternoon after

enjoying the Materuni Waterfall in the morning. It’s a great combo and the best way to get the

most out of your day-trip tour is with this option from Kili to savannah safari club. It’s always

fairly prices considering there are two activities combined into one day-trip waterfall with a

bunch of green plants in front of it;

Materuni Falls Tour

Relax at Hot Springs

Enjoy Materuni Waterfall

Great Value Daytrip

The local coffee growers take you through the entire process (you get to help too) of turning a

coffee bean into a mug of coffee… The Tanzanian way. It was actually a very insightful process

with lots of singing and talented work from the growers.

Each step was an intricate part of the process from bean to mug and it finished with a freshly

brewed Materuni coffee. Here’s a visual look at some of the different steps involved in the

process.

After enjoying a freshly brewed mug of coffee, we were treated to a locally produced lunch

spread. On the menu were banana and yam soup, vegetables, rice, and chicken. A delicious and

different fruits.',
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 850, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 3 to 5 people', 400, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 5 to 8 people', 300, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'swim-at-maji-motochemka-hot-spring-moshi',
    'Swim at Maji Moto(Chemka Hot Spring) Moshi',
    'Enjoy a day of relaxation at the Chemka Hot Springs, a hidden oasis with crystal-clear turquoise waters in the heart of the savanna.',
    'Cultural tour',
    '7 Days',
    'SUITABLE FOR ALL',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 850, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 3 to 5 people', 400, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 5 to 8 people', 300, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'mount-kilimanjaro-full-day-hike',
    'Mount Kilimanjaro Full Day Hike',
    'Experience a taste of Africa''s highest peak with a full day hike on Mount Kilimanjaro. This tour offers stunning views and a chance to explore the lower slopes of the iconic mountain.',
    'Climbing and Trekking',
    '7 Days',
    'SUITABLE FOR ALL',
    NULL,
    NULL,
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '2 people sharing', 850, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 3 to 5 people', 400, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'From 5 to 8 people', 300, 'USD', 2);
  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Information about the participants', '<ul><li>Difficulty: high-altitude trek</li><li>6 to 9 hours of walking per day</li><li>Excellent physical condition required and experience in challenging high-altitude treks necessary.</li><li>Some tricky sections (off-trail, descent on scree slopes...)</li><li>Limit the weight of personal belongings to 15 kg per person for the trek</li></ul>', 0);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Price details', '<ul><li>Prices decrease depending on the number of people registered.</li><li>The price for 1 person does not include the single room supplement.</li><li>Single room supplement: €278 / night / person</li></ul>', 1);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Equipment needed', '<ul><li>Contact us for a full packing list.</li><li>Mountaineering equipment provided.</li></ul>', 2);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Meals to bring', '<ul><li>Full board provided during the trek.</li><li>Please inform us of any dietary requirements at the time of booking.</li></ul>', 3);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Booking conditions', '<ul><li>Matthieu will be with you throughout your stay, starting with airport pickup.</li><li>Local guides assist during specialized activities.</li><li>UIAGM certified guides for mountain ascent.</li></ul>', 4);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Payment terms', 'A deposit of 30% of the total cost of your stay will be required upon registration to confirm your booking. The deposit will be paid via a Kazaden payment link.<br />The remaining balance must be paid no later than 31 days before the start date of your stay.', 5);
  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) 
  VALUES (v_package_id, 'Documents to be provided', '<ul><li>Passport must be valid for 6 months after return.</li><li>Visa requirements depend on nationality.</li><li>Vaccinations not mandatory but recommended.</li></ul>', 6);
END $$;

DO $$
DECLARE
  v_package_id uuid;
BEGIN
  INSERT INTO public.packages (
    slug, title, subtitle, category, duration_label, technical_level_label, 
    season_from, hero_description_html, meeting_point, is_active
  ) VALUES (
    'sarari-in-sothern-tanzania-selous-and-zanzibar',
    'Safari in Southern Tanzania: Selous & Zanzibar',
    'Discover the wild parks and beaches of Southern Tanzania Safari in Southern Tanzania: Selous

& Zanzibar',
    'Safari tour',
    '13 days',
    'Suitable for everyone',
    NULL,
    'Less popular than those in the North, the parks of Southern Tanzania nevertheless have nothing

to envy them. these parks, like that of Selous and Mikumi allow you to venture into a safari

apart, off the beaten track where you will discover heavenly places. we will marvel at the

rainbow that Tanzanian nature offers between the yellow of the savannah, the green of the palm

trees and the blue of the Indian Ocean. in this enchanting environment, we will go in search of

the most beautiful wild animals that make Tanzania famous, including the famous Big Five. We

end our stay with a stopover in Zanzibar, the famous island with heavenly beaches. go on an

adventure with this safari that will mark your life forever!



Gody Multi-activity mountain agency-portrait you communicate with Gody team throughout

your reservation.

Based in Arusha, our agency is the leading French-speaking receptionist in Tanzania. our great

experience allows us to offer you the most beautiful safaris or trekking stays by perfectly

meeting your expectations and your desires



Include Supervision by a French-speaking guide, a local guide, Local ranger for the 2 hikes in

the Selous, Accommodation in hotels (3 nights), campsites (7) and bungalows (2), full board

from dinner on day 1 to breakfast on day 11, Transportation to/from Dar es Salaam International

Airport, Transportation by 4x4 vehicle during safari, Camping equipment (2-person dome

tents+foam mattress+meals), Day 10 boat tour, boat Dar es Salaam/Zanzibar, minibus on the

island, Mineral water in the vehicle.',
    NULL,
    true
  ) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    duration_label = EXCLUDED.duration_label,
    technical_level_label = EXCLUDED.technical_level_label,
    season_from = EXCLUDED.season_from,
    hero_description_html = EXCLUDED.hero_description_html,
    meeting_point = EXCLUDED.meeting_point,
    is_active = EXCLUDED.is_active
  RETURNING id INTO v_package_id;

  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, '1 to 2 people', 3002, 'USD', 0);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Group of 3 people', 2365, 'USD', 1);
  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) 
  VALUES (v_package_id, 'Group of 4 to 5 people', 2051, 'USD', 2);
END $$;

