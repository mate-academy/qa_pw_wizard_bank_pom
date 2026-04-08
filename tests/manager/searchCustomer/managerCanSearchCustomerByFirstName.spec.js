import { test, expect } from '@playwright/test';

test('Manager can search customer by First Name', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');

  const searchInput = page.locator('input[ng-model="searchCustomer"]');
  await searchInput.fill('Hermoine'); 

  const firstRow = page.locator('table tbody tr').first();
  await expect(firstRow).toContainText('Hermoine');
});