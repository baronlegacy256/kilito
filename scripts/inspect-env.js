const fs = require('fs');
const content = fs.readFileSync('.env.local', 'utf8');
const lines = content.split('\n');
for (const line of lines) {
  if (line.includes('ADMIN_EMAIL')) {
    console.log('Line:', JSON.stringify(line));
    for (let i = 0; i < line.length; i++) {
        console.log(`char[${i}]: ${line[i]} (code: ${line.charCodeAt(i)})`);
    }
  }
}
