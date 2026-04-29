const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, key);

async function checkSchema() {
  // Use a query that works even if RLS is on but table exists
  const { data, error } = await supabase.rpc('get_table_schema', { t_name: 'packages' }); 
  
  if (error) {
    // RPC might not exist, try direct query to pg_tables via service role if allowed
    const { data: pgData, error: pgError } = await supabase.from('pg_tables').select('schemaname').eq('tablename', 'packages');
    if (pgError) {
        console.error('Error fetching pg_tables:', pgError);
    } else if (pgData && pgData.length > 0) {
        console.log('Table "packages" found in schema(s):', pgData.map(r => r.schemaname).join(', '));
    } else {
        // Try information_schema
        const { data: infoData, error: infoError } = await supabase.rpc('run_sql', { sql: "SELECT table_schema FROM information_schema.tables WHERE table_name = 'packages'" });
        if (infoError) {
             // Last resort: we know it exists because .from('packages') worked.
             // Usually that means it's in the default search path, which is public.
             console.log('Table "packages" exists (verified via .from().select()) but schema query failed.');
        } else {
            console.log('Schema:', infoData);
        }
    }
  } else {
    console.log('Schema:', data);
  }
}

checkSchema();
