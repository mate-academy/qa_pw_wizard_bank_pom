import { test, expect } from '@playwright/test';

test('Manager can delete customer', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');

  
  const customerRow = page.locator('tr', { hasText: 'Hermoine' });
  
  
  await customerRow.locator('button[ng-click*="deleteCust"]').click();


  await expect(customerRow).not.toBeVisible();
});