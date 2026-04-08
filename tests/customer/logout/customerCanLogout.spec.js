import { test, expect } from '@playwright/test';

test('Customer can logout', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer');
  await page.selectOption('#userSelect', { label: 'Harry Potter' });
  await page.click('button:has-text("Login")');
  
  await page.click('button:has-text("Logout")');

  await expect(page.locator('#userSelect')).toBeVisible();
});