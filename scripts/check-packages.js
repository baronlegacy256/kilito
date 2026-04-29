const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPackages() {
  console.log('Checking packages in Supabase...');
  const { data, error } = await supabase
    .from('packages')
    .select('id, slug, title, is_active');

  if (error) {
    console.error('Error fetching packages:', error);
    return;
  }

  console.log('Found packages:', JSON.stringify(data, null, 2));
}

checkPackages();
