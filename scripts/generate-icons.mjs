import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'node:fs';

const svg = readFileSync('public/logo.svg');

mkdirSync('public/icons', { recursive: true });

await sharp(svg).png().toFile('public/icons/icon-192.png');
await sharp(svg).png().toFile('public/icons/icon-512.png');
await sharp(svg).resize(180, 180).png().toFile('public/icons/apple-touch-icon.png');

console.log('PWA icons generated');
