import { expect, test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
 
  const loginPage = new BankHomePage(page);
  const bankManagerPage = new BankManagerMainPage(page);

  await loginPage.open();
  await loginPage.bankLoginButton.click();
  await expect(bankManagerPage.addCustomerButton).toBeVisible();
  await expect(bankManagerPage.openAccountButton).toBeVisible();
  await expect(bankManagerPage.customersButton).toBeVisible();

});
