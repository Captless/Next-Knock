import puppeteer from 'puppeteer-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE_URL || 'http://localhost:5173';
const OUT = 'captures';

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'desktop', width: 1440, height: 900 },
];

const publicPages = ['/', '/about', '/contact', '/privacy', '/terms', '/login', '/signup'];
const protectedPages = ['/app', '/app/quotes', '/app/quotes/new', '/app/settings'];

const slug = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_'));

async function captureRoute(browser, path, cookies) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      errors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

  if (cookies?.length) await page.setCookie(...cookies);

  try {
    await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 400));
  } catch (e) {
    console.error(`nav fail ${path}: ${e.message}`);
  }

  const clean = slug(path);
  for (const vp of viewports) {
    await page.setViewport(vp);
    await new Promise((r) => setTimeout(r, 250));
    const file = join(OUT, `${vp.name}-${clean}.png`);
    await page.screenshot({ path: file });
    console.log(`captured ${vp.name} ${path}`);
  }

  if (errors.length) {
    writeFileSync(join(OUT, `console-${clean}.txt`), errors.join('\n') + '\n');
    console.log(`  ${errors.length} console issue(s) -> console-${clean}.txt`);
  }

  await page.close();
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      `--user-data-dir=${join(os.tmpdir(), 'nk-puppeteer-profile')}`,
    ],
  });

  for (const p of publicPages) await captureRoute(browser, p);

  const email = process.env.NK_EMAIL;
  const password = process.env.NK_PASSWORD;
  if (email && password) {
    const auth = await browser.newPage();
    const res = await auth.evaluate(
      async (creds, base) => {
        const r = await fetch(base + '/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(creds),
        });
        return { ok: r.ok, status: r.status };
      },
      { email, password },
      BASE,
    );
    await auth.close();
    if (res.ok) {
      const auth2 = await browser.newPage();
      await auth2.goto(BASE + '/app', { waitUntil: 'domcontentloaded' });
      const cookies = await auth2.cookies();
      await auth2.close();
      for (const p of protectedPages) await captureRoute(browser, p, cookies);
    } else {
      console.error(`login failed (${res.status}), skipping protected pages`);
    }
  }

  await browser.close();
  console.log(`\ndone. screenshots in ${OUT}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
