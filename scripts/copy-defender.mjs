import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const out = 'public/compliance-defender';
mkdirSync(join(out, 'dist'), { recursive: true });
copyFileSync('compliance-defender/index.html', join(out, 'index.html'));
copyFileSync('compliance-defender/dist/compliance-defender.js', join(out, 'dist/compliance-defender.js'));
copyFileSync('compliance-defender/dist/compliance-defender.js', join(out, 'dist/compliance-defender-v7.js'));
console.log('Copied Compliance Defender to public/compliance-defender/');