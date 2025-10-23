const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function createAdminUser() {
  try {
    const adminData = {
      email: 'admin@quetaboost.com',
      password: 'admin123', // Change this password after first login!
      name: 'Administrator',
      role: 'admin'
    };

    console.log('Creating admin user...');

    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from('users')
      .select('*')
      .eq('email', adminData.email)
      .single();

    if (existingAdmin) {
      console.log('❌ Admin user already exists!');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create admin user
    const { data: newAdmin, error } = await supabase
      .from('users')
      .insert([
        {
          email: adminData.email,
          password: hashedPassword,
          name: adminData.name,
          role: adminData.role,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
}

createAdminUser();
