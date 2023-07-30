import AxeBuilder from '@axe-core/playwright';
const { test, expect } = require('@playwright/test'); 

test('User Login', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const emailInput = await page.waitForSelector('#email');
  const passwordInput = await page.waitForSelector('#password');
  const loginButton = await page.waitForSelector('button[type="submit"]');

  await emailInput.type('senurajayadeva@gmail.com');
  await passwordInput.type('Senura@8864');

  // Capture the current URL before clicking the login button
  const initialURL = page.url();

  await loginButton.click();

  // Wait for the URL to change to the expected "/user" page URL
  await page.waitForURL('http://localhost:3000/user');

  // Get the final URL after clicking the login button
  const finalURL = page.url();

  // Assert that the final URL matches the expected "/user" page URL
  expect(finalURL).toBe('http://localhost:3000/user');

  // Optionally, you can also check the content on the "/user" page
  // For example, await page.waitForSelector('.welcome-message');
  // const welcomeMessage = await page.$('.welcome-message');
  // expect(welcomeMessage).not.toBeNull();
});

test.describe('Logic Page Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:3000'); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});