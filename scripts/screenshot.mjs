
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

  const button = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(button => button.textContent.includes('New Project'));
  });

  if (button) {
    await button.click();
  } else {
    throw new Error('Button not found');
  }


  await page.waitForSelector('div[role="dialog"]');
  await page.screenshot({ path: 'screenshots/02-project-creation-dialog.png' });
  await browser.close();
})();
