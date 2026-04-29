const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../public/package-data.json');
const outputPath = path.join(__dirname, '../supabase/migrated-seed.sql');

const categoryMap = {
  1: 'Safari tour',
  2: 'Climbing and Trekking',
  3: 'Cultural tour'
};

/**
 * Mapping JSON to existing package-details-schema.sql fields
 * Existing fields:
 * - slug (JSON: slug)
 * - title (JSON: title)
 * - subtitle (JSON: description)
 * - category (JSON: package_category_id mapping)
 * - top_background_image (Ignore as per user request to insert manually)
 * - duration_label (JSON: duration)
 * - technical_level_label (JSON: technical_level)
 * - technical_level_note (NULL)
 * - physical_level_label (NULL)
 * - physical_level_note (NULL)
 * - max_group_size_label (NULL)
 * - season_from (JSON: season)
 * - season_to (NULL)
 * - hero_description_html (JSON: long_description)
 * - meeting_point (JSON: meeting_point)
 * - itinerary_intro_html (NULL)
 * - is_active (JSON: is_active)
 */

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  if (typeof str === 'boolean') return str ? 'true' : 'false';
  if (typeof str === 'number') return str;
  return `'${str.replace(/'/g, "''")}'`;
}

try {
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(rawData);
  const packages = data.packages;

  let sql = '-- Seed data generated from package-data.json targeting existing schema\n\n';

  packages.forEach((pkg, index) => {
    sql += `DO $$\n`;
    sql += `DECLARE\n`;
    sql += `  v_package_id uuid;\n`;
    sql += `BEGIN\n`;
    
    // Insert package using ONLY existing fields from package-details-schema.sql
    sql += `  INSERT INTO public.packages (\n`;
    sql += `    slug, title, subtitle, category, duration_label, technical_level_label, \n`;
    sql += `    season_from, hero_description_html, meeting_point, is_active\n`;
    sql += `  ) VALUES (\n`;
    sql += `    ${escapeSql(pkg.slug)},\n`;
    sql += `    ${escapeSql(pkg.title)},\n`;
    sql += `    ${escapeSql(pkg.description)},\n`;
    sql += `    ${escapeSql(categoryMap[pkg.package_category_id])},\n`;
    sql += `    ${escapeSql(pkg.duration)},\n`;
    sql += `    ${escapeSql(pkg.technical_level)},\n`;
    sql += `    ${escapeSql(pkg.season)},\n`;
    sql += `    ${escapeSql(pkg.long_description)},\n`;
    sql += `    ${escapeSql(pkg.meeting_point)},\n`;
    sql += `    ${pkg.is_active === 1 ? 'true' : 'false'}\n`;
    sql += `  ) ON CONFLICT (slug) DO UPDATE SET \n`;
    sql += `    title = EXCLUDED.title,\n`;
    sql += `    subtitle = EXCLUDED.subtitle,\n`;
    sql += `    category = EXCLUDED.category,\n`;
    sql += `    duration_label = EXCLUDED.duration_label,\n`;
    sql += `    technical_level_label = EXCLUDED.technical_level_label,\n`;
    sql += `    season_from = EXCLUDED.season_from,\n`;
    sql += `    hero_description_html = EXCLUDED.hero_description_html,\n`;
    sql += `    meeting_point = EXCLUDED.meeting_point,\n`;
    sql += `    is_active = EXCLUDED.is_active\n`;
    sql += `  RETURNING id INTO v_package_id;\n\n`;

    // Pricing tiers (Existing table)
    if (pkg.pricing_tiers && pkg.pricing_tiers.length > 0) {
      sql += `  DELETE FROM public.package_pricing_tiers WHERE package_id = v_package_id;\n`;
      pkg.pricing_tiers.forEach((tier, tIdx) => {
        const priceAmount = typeof tier.price === 'string' ? parseFloat(tier.price.replace(/[^0-9.]/g, '')) : tier.price;
        sql += `  INSERT INTO public.package_pricing_tiers (package_id, label, price_amount, currency_code, sort_order) \n`;
        sql += `  VALUES (v_package_id, ${escapeSql(tier.label)}, ${priceAmount || 0}, 'USD', ${tIdx});\n`;
      });
    }

    // Practical info (Existing table)
    if (pkg.practical_info && pkg.practical_info.length > 0) {
      sql += `  DELETE FROM public.package_practical_information WHERE package_id = v_package_id;\n`;
      pkg.practical_info.forEach((info, iIdx) => {
        sql += `  INSERT INTO public.package_practical_information (package_id, question, answer_html, sort_order) \n`;
        sql += `  VALUES (v_package_id, ${escapeSql(info.label)}, ${escapeSql(info.content)}, ${iIdx});\n`;
      });
    }

    sql += `END $$;\n\n`;
  });

  fs.writeFileSync(outputPath, sql);
  console.log(`Successfully generated ${outputPath}`);

} catch (err) {
  console.error('Error generating SQL:', err);
  process.exit(1);
}
