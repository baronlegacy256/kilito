/* eslint-disable no-console */
/**
 * Generate ADMIN_PASSWORD_HASH for .env.local
 * Usage: node scripts/hash-admin-password.js "your-strong-password"
 */
const bcrypt = require("bcryptjs");

const plain = process.argv[2];
if (!plain) {
  console.error('Usage: node scripts/hash-admin-password.js "your-password"');
  process.exit(1);
}

console.log(bcrypt.hashSync(plain, 12));
