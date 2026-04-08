import { test, expect } from '@playwright/test';

test('Manager can choose currencies', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');

  
  await page.selectOption('#userSelect', { label: 'Harry Potter' });


  const currencyOptions = page.locator('#currency option');
  

  await expect(currencyOptions).toContainText(['Dollar', 'Pound', 'Rupee']);
});