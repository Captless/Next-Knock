import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0A0A0A"/>
  <path d="M256 150 L256 362 M176 286 L256 366 L336 286" stroke="#FAFAF9" stroke-width="38" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`);

mkdirSync('public/icons', { recursive: true });

await sharp(svg).png().toFile('public/icons/icon-192.png');
await sharp(svg).png().toFile('public/icons/icon-512.png');
await sharp(svg).resize(180, 180).png().toFile('public/icons/apple-touch-icon.png');

console.log('PWA icons generated');
