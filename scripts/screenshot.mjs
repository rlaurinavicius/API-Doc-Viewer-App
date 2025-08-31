
import puppeteer from 'puppeteer';
import fs from 'fs';

const screenshotsDir = './screenshots';
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  // Give the page some time to load
  await sleep(3000);

  await page.screenshot({ path: 'screenshots/03-sidebar-with-docs.png', fullPage: true });
  await browser.close();
})();
