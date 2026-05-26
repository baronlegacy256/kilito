const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      // Remove wrapping quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    }
  });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
    console.error('Missing Supabase environment variables in .env.local');
    process.exit(1);
}

const supabase = createClient(url, key, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});

async function main() {
    try {
        console.log('Fetching users from auth.users...');
        const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
        if (usersError) {
            console.error('Error fetching auth users:', usersError);
        } else {
            console.log(`Found ${users.length} auth users:`);
            users.forEach(u => {
                console.log(`- ID: ${u.id}, Email: ${u.email}, Last Sign In: ${u.last_sign_in_at}`);
            });
        }

        console.log('\nFetching from admin_profiles...');
        const { data: profiles, error: profilesError } = await supabase.from('admin_profiles').select('*');
        if (profilesError) {
            console.error('Error fetching admin profiles:', profilesError);
        } else {
            console.log(`Found ${profiles.length} admin profiles:`);
            profiles.forEach(p => {
                console.log(`- User ID: ${p.user_id}, Name: ${p.full_name}, Active: ${p.is_active}`);
            });
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

main();
