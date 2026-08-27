import puppeteer from 'puppeteer-core';
import lighthouse from 'lighthouse';
import { writeFileSync } from 'fs';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--ignore-certificate-errors', '--allow-insecure-localhost'],
});

const page = await browser.newPage();
await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle2', timeout: 30000 });

const { lhr } = await lighthouse('http://127.0.0.1:4173', {
  port: new URL(browser.wsEndpoint()).port,
  output: 'json',
  logLevel: 'error',
});

writeFileSync('lighthouse-report.json', JSON.stringify(lhr, null, 2));

console.log('\n=== SCORES ===');
Object.values(lhr.categories).forEach(c => {
  console.log(`${c.title}: ${Math.round(c.score * 100)}`);
});

console.log('\n=== ISSUES ===');
Object.values(lhr.audits).filter(a => a.score !== null && a.score < 1).forEach(a => {
  const sev = a.score === 0 ? 'FAIL' : 'WARN';
  const items = a.details?.items?.length || 0;
  console.log(`[${sev}] ${a.title} (${items} items)`);
  if (a.description) console.log(`  ${a.description.slice(0, 150)}`);
});

console.log('\n=== SECURITY & BEST PRACTICES ===');
Object.values(lhr.audits).filter(a =>
  a.id.includes('security') || a.id.includes('csp') || a.id.includes('xss') ||
  a.id.includes('cors') || a.id.includes('credential') || a.id.includes('href') ||
  a.id.includes('http') || a.id.includes('unsafe') || a.id.includes('Geolocation') ||
  a.id.includes('notification') || a.id.includes('paste') || a.id.includes('error')
).forEach(a => {
  const status = a.score === 1 ? 'PASS' : a.score === 0 ? 'FAIL' : 'N/A';
  console.log(`[${status}] ${a.id}: ${a.title}`);
  if (a.score !== 1 && a.description) console.log(`  ${a.description.slice(0, 200)}`);
});

await browser.close();
