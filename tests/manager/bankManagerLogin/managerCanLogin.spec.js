import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage'

test('Assert manager can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();
  await bankHomePage.assertAddCustomerButton();
  await bankHomePage.assertOpenAccountButton();
  await bankHomePage.assertCustomersButton();



  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
});
