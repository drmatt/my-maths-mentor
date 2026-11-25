// Renders public/og-image.png (1200×630), the preview shown when the site is shared
// on WhatsApp, Facebook, LinkedIn and so on. Needs Google Chrome installed locally.
//   npm run og
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const font = (pkg, file) => pathToFileURL(join(root, 'node_modules', pkg, 'files', file)).href;
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Same viaduct geometry as src/components/sketches/Viaduct.astro.
const r = 58, spring = 250, ground = 420, deck = 150;
const centres = [-52, 92, 236, 380, 524, 668];
const openings = centres.map((c) => `M${c - r} ${ground}V${spring}A${r} ${r} 0 0 1 ${c + r} ${spring}V${ground}Z`).join('');
const structure = `M-200 ${deck}H840V${ground}H-200Z${openings}`;
const rings = centres.map((c) => `M${c - r - 11} ${spring}A${r + 11} ${r + 11} 0 0 1 ${c + r + 11} ${spring}`).join('');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Fredoka; src: url(${font('@fontsource-variable/fredoka', 'fredoka-latin-wght-normal.woff2')}); font-weight: 300 700; }
@font-face { font-family: 'DM Sans'; src: url(${font('@fontsource-variable/dm-sans', 'dm-sans-latin-wght-normal.woff2')}); font-weight: 100 1000; }
@font-face { font-family: Caveat; src: url(${font('@fontsource/caveat', 'caveat-latin-500-normal.woff2')}); font-weight: 500; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { background: #FBF8EF; color: #244B52; font-family: 'DM Sans'; position: relative;
  background-image: linear-gradient(rgb(36 75 82 / .05) 1px, transparent 1px), linear-gradient(90deg, rgb(36 75 82 / .05) 1px, transparent 1px);
  background-size: 24px 24px; }
.copy { position: absolute; left: 72px; top: 64px; width: 560px; }
.mark { font-family: Fredoka; font-weight: 600; font-size: 34px; letter-spacing: -.02em; }
.mark span, .hl { background: linear-gradient(transparent 62%, #F6CD58 62%, #F6CD58 92%, transparent 92%); }
.strap { font-family: Caveat; font-size: 40px; color: #A3412F; margin: 54px 0 10px; }
h1 { max-width: 500px; font-family: Fredoka; font-weight: 600; font-size: 60px; line-height: 1.04; letter-spacing: -.02em; }
.meta { margin-top: 30px; font-size: 24px; font-weight: 500; color: #4A6468; }
.meta strong { color: #244B52; }
.art { position: absolute; right: 48px; top: 100px; width: 500px; transform: rotate(-2deg); }
.card { background: #FFFDF7; border: 1px solid rgb(36 75 82 / .14); border-radius: 6px; box-shadow: 0 16px 40px -16px rgb(36 75 82 / .35);
  background-image: linear-gradient(rgb(36 75 82 / .07) 1px, transparent 1px), linear-gradient(90deg, rgb(36 75 82 / .07) 1px, transparent 1px); background-size: 20px 20px; overflow: hidden; }
.dot { position: absolute; border-radius: 50%; background: #F6CD58; width: 130px; height: 130px; right: 20px; bottom: 40px; }
.sq { position: absolute; background: #B5A5E4; width: 96px; height: 96px; border-radius: 16px; right: 520px; top: 70px; transform: rotate(12deg); }
.tape { position: absolute; width: 110px; height: 26px; background: rgb(246 205 88 / .75); top: -12px; }
svg text { font-family: Caveat; font-weight: 500; fill: #244B52; }
</style></head><body>
<div class="sq"></div><div class="dot"></div>
<div class="copy">
  <div class="mark">my <span>maths</span> mentor</div>
  <div class="strap">Confidence counts.</div>
  <h1>Helping children find their <span class="hl">confidence</span> in maths again.</h1>
  <p class="meta">Maths mentoring in Stockport · <strong>£40 per hour</strong></p>
</div>
<div class="art">
  <div class="tape" style="left:40px;transform:rotate(-6deg)"></div><div class="tape" style="right:40px;transform:rotate(5deg)"></div>
  <div class="card"><svg viewBox="0 0 640 480" width="500" height="375">
    <circle cx="560" cy="74" r="34" fill="#F6CD58" stroke="#244B52" stroke-width="2.5"/>
    <rect x="-10" y="420" width="660" height="70" fill="#B5A5E4" opacity=".55"/>
    <path d="${structure}" fill="#F29481" fill-rule="evenodd"/>
    <path d="${rings}" fill="none" stroke="#244B52" stroke-width="1.75" opacity=".55"/>
    <path d="${structure}" fill="none" stroke="#244B52" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="372" y="124" width="74" height="26" rx="6" fill="#244B52"/><rect x="452" y="124" width="74" height="26" rx="6" fill="#244B52"/>
    <path d="M532 150V130q0-6 6-6h52q14 0 20 14l4 12Z" fill="#244B52"/>
    <g fill="none" stroke="#244B52" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M146 112C176 130 196 152 205 184M196 177l9 10 4-13"/>
      <circle cx="236" cy="250" r="58" stroke-width="1.75" stroke-dasharray="6 6"/>
      <path d="M166 250H314M306 244l8 6-8 6M236 328V172M230 180l6-8 6 8"/>
      <path d="M236 250L277 209" stroke-width="3"/>
      <path d="M178 386H294M178 378v16M294 378v16" stroke-width="1.75"/>
    </g>
    <circle cx="277" cy="209" r="5" fill="#244B52"/>
    <text x="30" y="70" font-size="46">x² + y² = r²</text>
    <text x="32" y="100" font-size="21" style="fill:#A3412F">if the arch were a perfect semicircle…</text>
    <text x="244" y="228" font-size="26">r</text><text x="236" y="377" font-size="24" text-anchor="middle">2r</text>
    <text x="22" y="468" font-size="22">Stockport Viaduct</text>
  </svg></div>
</div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'mmm-og-'));
const page = join(dir, 'og.html');
writeFileSync(page, html);
const out = join(root, 'public', 'og-image.png');
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', `--user-data-dir=${join(dir, 'profile')}`,
  '--allow-file-access-from-files', '--window-size=1200,630', '--virtual-time-budget=3000',
  `--screenshot=${out}`, pathToFileURL(page).href,
], { stdio: 'ignore' });
rmSync(dir, { recursive: true, force: true });
console.log(`Wrote ${out}`);
