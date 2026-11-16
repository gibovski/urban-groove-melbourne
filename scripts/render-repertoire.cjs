// Keep the complete, source-attributed repertoire in the initial HTML response.
const fs = require('node:fs');
const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const songs = JSON.parse(fs.readFileSync('assets/songs.json', 'utf8'));
const rows = songs.map(s => `<div class="song" data-set="${escape(s.set)}"><strong>${escape(s.title)}</strong><span>${escape(s.artist)}</span></div>`).join('\n');
const path = 'index.html';
const original = fs.readFileSync(path, 'utf8');
const rendered = original.replace(/<!-- repertoire:start -->[\s\S]*?<!-- repertoire:end -->/, `<!-- repertoire:start -->\n${rows}\n<!-- repertoire:end -->`);
if (process.argv.includes('--check')) {
 if (rendered !== original) { console.error('Run npm run build to refresh the static repertoire'); process.exit(1); }
} else fs.writeFileSync(path, rendered);
