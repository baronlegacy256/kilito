const { createClient } = require('@supabase/supabase-js');

async function check() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing ENV');
    return;
  }
  const supabase = createClient(url, key);
  const { data, error } = await supabase.from('package_stays').select('id').limit(1);
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success, table exists');
  }
}

check();
