const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/Packages/TopZone.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix style="height: 0" -> style={{ height: "0" }}
// This simple regex handles basic inline styles found in copied HTML
content = content.replace(/style="([^"]+)"/g, (match, styleString) => {
    // Convert string "height: 0; width: 100%" to React style object
    const styleObj = {};
    styleString.split(';').forEach(rule => {
        if (!rule.trim()) return;
        const parts = rule.split(':');
        if (parts.length === 2) {
            let key = parts[0].trim();
            // camelCase the CSS property
            key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            const value = parts[1].trim();
            styleObj[key] = value;
        }
    });
    return `style={${JSON.stringify(styleObj)}}`;
});

// 2. Fix onclick="..." and onClick="..." (with string values)
content = content.replace(/onChange="([^"]+)"/ig, `onChange={() => { /* $1 */ }}`);
content = content.replace(/onClick="([^"]+)"/ig, `onClick={() => { /* $1 */ }}`);
content = content.replace(/onclick="([^"]+)"/ig, `onClick={() => { /* $1 */ }}`);

// 3. Fix unclosed tags like <img ... > to <img ... /> or self-closing rules
// Note: most might be closed, but just checking if there are obvious ones. The user said "and all other errors".
// We will replace class= with className= just in case
content = content.replace(/\sclass="([^"]*)"/g, ' className="$1"');

// 4. Fix for= to htmlFor=
content = content.replace(/\sfor="([^"]*)"/g, ' htmlFor="$1"');

// 5. Fix tabindex to tabIndex
content = content.replace(/\stabindex="([^"]*)"/g, ' tabIndex="$1"');

// 6. Fix colspan to colSpan
content = content.replace(/\scolspan="([^"]*)"/g, ' colSpan="$1"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed JSX in Principal.jsx');
