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
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    }
  });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
    console.error('Missing Supabase variables in .env.local');
    process.exit(1);
}

const supabase = createClient(url, serviceKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});

const ADMIN_EMAIL = 'info@kilitosavannasafariclub.com';
const ADMIN_PASSWORD = '~Vm40CA37W#';
const ADMIN_NAME = 'Kilito Savanna Admin';

async function main() {
    try {
        console.log(`Checking if user ${ADMIN_EMAIL} already exists in auth.users...`);
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;

        let authUser = users.find(u => u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
        
        if (!authUser) {
            console.log(`User does not exist. Creating auth user...`);
            const { data, error: createError } = await supabase.auth.admin.createUser({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                email_confirm: true,
                user_metadata: { full_name: ADMIN_NAME }
            });
            if (createError) throw createError;
            authUser = data.user;
            console.log(`Auth user created successfully with ID: ${authUser.id}`);
        } else {
            console.log(`User already exists in auth.users with ID: ${authUser.id}`);
            
            // Optionally update password to ensure it matches the requested one
            console.log(`Updating password for ${ADMIN_EMAIL}...`);
            const { error: updateError } = await supabase.auth.admin.updateUserById(authUser.id, {
                password: ADMIN_PASSWORD
            });
            if (updateError) throw updateError;
            console.log(`Password updated successfully.`);
        }

        console.log(`Checking if admin profile exists for user ID: ${authUser.id}...`);
        const { data: profile, error: profileGetError } = await supabase
            .from('admin_profiles')
            .select('*')
            .eq('user_id', authUser.id)
            .single();

        if (profileGetError && profileGetError.code === 'PGRST116') {
            console.log(`Admin profile not found. Inserting active admin profile...`);
            const { error: insertError } = await supabase
                .from('admin_profiles')
                .insert([{
                    user_id: authUser.id,
                    full_name: ADMIN_NAME,
                    is_active: true
                }]);
            if (insertError) throw insertError;
            console.log(`Admin profile created successfully.`);
        } else if (profileGetError) {
            throw profileGetError;
        } else {
            console.log(`Admin profile already exists:`, profile);
            if (!profile.is_active) {
                console.log(`Activating inactive admin profile...`);
                const { error: activateError } = await supabase
                    .from('admin_profiles')
                    .update({ is_active: true })
                    .eq('user_id', authUser.id);
                if (activateError) throw activateError;
                console.log(`Profile activated successfully.`);
            }
        }

        console.log(`\n🎉 Success! Admin user ${ADMIN_EMAIL} is fully set up and activated.`);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

main();
