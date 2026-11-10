// Runs on every Netlify deploy. Combines posts in content/updates into updates.json.
const fs = require('fs'), path = require('path');
const dir = 'content/updates';
const out = [];
if (fs.existsSync(dir)) {
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    try { out.push(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))); }
    catch (e) { console.warn('Skipping ' + f + ': ' + e.message); }
  }
}
out.sort((a, b) => String(b.date).localeCompare(String(a.date)));
fs.writeFileSync('updates.json', JSON.stringify(out));
console.log(out.length + ' updates written');
