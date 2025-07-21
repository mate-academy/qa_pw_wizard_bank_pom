import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';

test('Assert manager can Login', async ({ page }) => {
  
  const bankHomePage = new BankHomePage(page);
  // Test:
  // 1. Open Wizard bank home page 
  //   https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  await bankHomePage.open();
  // 2. Click [Bank Manager Login]
  await bankHomePage.clickBankManagerLogin();
  // 3. Assert button [Add Customer] is visible
  await bankHomePage.assertAddButtonExists('Add Customer');
  // 4. Assert button [Open Account] is visible
  await bankHomePage.assertAddButtonExists('Open Account');
  // 5. Assert button [Customers] is visible
  await bankHomePage.assertAddButtonExists('Customers');
});
