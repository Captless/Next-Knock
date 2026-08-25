import puppeteer from 'puppeteer-core';
import os from 'node:os';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE_URL || 'http://localhost:5173';

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'desktop', width: 1440, height: 900 },
];

const pages = ['/', '/about', '/contact', '/privacy', '/terms', '/login', '/signup'];

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', `--user-data-dir=${os.tmpdir()}\\nk-puppeteer-profile`],
  });

  let problems = 0;
  for (const path of pages) {
    const page = await browser.newPage();
    await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {});
    for (const vp of viewports) {
      await page.setViewport(vp);
      await new Promise((r) => setTimeout(r, 200));
      const data = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
        offenders: [...document.querySelectorAll('*')]
          .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
          .slice(0, 3)
          .map((el) => el.className?.toString().slice(0, 40) || el.tagName),
      }));
      if (data.scrollW > data.clientW + 1) {
        problems++;
        console.log(`OVERFLOW ${vp.name} ${path}: scrollW=${data.scrollW} clientW=${data.clientW} offenders=${JSON.stringify(data.offenders)}`);
      }
    }
    await page.close();
  }
  await browser.close();
  console.log(problems === 0 ? '\nNo horizontal overflow detected on any page/viewport.' : `\n${problems} overflow issue(s) found.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
