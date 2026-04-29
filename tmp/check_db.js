const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
    console.error('Missing SUPABASE env vars');
    process.exit(1);
}

const supabase = createClient(url, key);

async function checkTables() {
  console.log('Checking tables in Suprabase...');
  
  const { data, error } = await supabase
    .from('packages')
    .select('id')
    .limit(1);
  
  if (error) {
    console.error('Error fetching packages:', error);
    if (error.code === '42P01') {
        console.log('CONFIRMED: Table "packages" does not exist.');
    }
  } else {
    console.log('Successfully fetched packages. Table exists.');
  }

  // Try to list all tables via a common query if allowed
  const { data: tables, error: tablesError } = await supabase
    .from('packages') // Just to check if we can even talk to the DB
    .select('*')
    .limit(0);
    
  if (tablesError && tablesError.code !== '42P01') {
      console.error('Connection error:', tablesError);
  }
}

checkTables();
