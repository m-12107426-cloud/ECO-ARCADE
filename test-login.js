const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');

  // Verify overlay is visible
  const overlayVisible = await page.isVisible('#login-overlay');
  console.log('Login overlay visible:', overlayVisible);

  // Test invalid login
  await page.fill('#login-username', 'WRONGUSER');
  await page.fill('#login-password', 'WRONGPASS');
  await page.click('#login-btn');
  await page.waitForTimeout(500);

  const errorVisible = await page.isVisible('#login-error:not(.hidden)');
  console.log('Error message visible for invalid login:', errorVisible);

  // Test valid login
  await page.fill('#login-username', 'KUMP84DWIN');
  await page.fill('#login-password', 'WECANW1NGENG');
  await page.click('#login-btn');
  await page.waitForTimeout(800);

  const overlayHidden = await page.evaluate(() => document.getElementById('login-overlay').classList.contains('authenticated'));
  console.log('Overlay authenticated & hidden after correct login:', overlayHidden);

  await page.screenshot({ path: '/home/jules/verification/screenshots/login-verified.png' });
  await browser.close();
})();
