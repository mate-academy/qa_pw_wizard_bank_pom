import { expect, test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';

test.describe('Bank Manager Login', () => {
  let bankHomePage;

  test.beforeEach(async ({ page }) => {
    bankHomePage = new BankHomePage(page);
    await bankHomePage.open();
  });

test('Assert manager can Login', async ({ page }) => {
  // #region Task: Assert manager can Login
  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
//  #endregion
 await bankHomePage.managerLoginButton.click();
 await expect(bankHomePage.addCustomerButton).toBeVisible();
 await expect(bankHomePage.openAccountButton).toBeVisible();
 await expect(bankHomePage.customersButton).toBeVisible();
});
});