const fs = require('fs');
const content = fs.readFileSync('.env.local', 'utf8');
const lines = content.split('\n');
for (const line of lines) {
  if (line.includes('ADMIN_PASSWORD=')) {
    console.log('PW Line:', JSON.stringify(line));
  }
  if (line.includes('ADMIN_PASSWORD_HASH=')) {
    console.log('HASH Line:', JSON.stringify(line));
  }
}
