import { test, expect } from '@playwright/test';

test('Manager can search customer by Postal Code', async ({ page }) => {

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');

 
  const searchInput = page.locator('input[ng-model="searchCustomer"]');
  

  const postalCode = 'E725JB';
  await searchInput.fill(postalCode);

 
  const tableRow = page.locator('table tbody tr').first();
  await expect(tableRow).toBeVisible();
  await expect(tableRow).toContainText(postalCode);
});