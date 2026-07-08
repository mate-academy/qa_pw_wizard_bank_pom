import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';;

test('Assert manager can Login', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login */
  const managerMainPage = new BankManagerMainPage(page);
  
  await managerMainPage.open();

  // 2. Click [Bank Manager Login]

  await managerMainPage.login();
  
  // 3. Assert button [Add Customer] is visible

  await managerMainPage.assertAddCustomerButtonVisible();

  // 4. Assert button [Open Account] is visible

  await managerMainPage.assertOpenAccountButtonVisible();

  // 5. Assert button [Customers] is visible

  await managerMainPage.assertCustomersButtonVisible();

  // */
});
