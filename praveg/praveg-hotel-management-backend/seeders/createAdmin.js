const bcrypt = require('bcrypt');
const User = require('../models/user');
const sequelize = require('../config/database');

const seedAdmin = async () => {
  await sequelize.sync(); // Ensure database is ready

  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await User.create({
    phone_number: '9999999999',
    password: hashedPassword,
    role: 'admin',
    is_active: true
  });

  console.log('✅ Admin user created successfully!');
};

seedAdmin().catch(console.error).finally(() => process.exit());
