import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = 'compliance-defender';
const jsPath = join(root, 'dist/compliance-defender.js');
const htmlPath = join(root, 'index.html');
const outHtml = join('public/compliance-defender', 'index.html');
const outJs = join('public/compliance-defender/dist/compliance-defender.js');

let js = readFileSync(jsPath, 'utf8');
js = js.replace(/export\s*\{\s*\}\s*;?\s*$/m, '').trim();

let html = readFileSync(htmlPath, 'utf8');
if (!html.includes('<!-- GAME_SCRIPT_INLINE -->')) {
  throw new Error('index.html missing <!-- GAME_SCRIPT_INLINE --> placeholder');
}
html = html.replace(
  '  <!-- GAME_SCRIPT_INLINE -->',
  `<script>\n${js}\n</script>`,
);

writeFileSync(outHtml, html);
writeFileSync(outJs, js);
console.log('Inlined Compliance Defender BUILD into public/compliance-defender/index.html');