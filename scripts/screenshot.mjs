
import puppeteer from 'puppeteer';
import fs from 'fs';

const screenshotsDir = './screenshots';
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'screenshots/01-initial-layout.png' });
  await browser.close();
})();
