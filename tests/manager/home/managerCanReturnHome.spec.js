import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can return to the home page', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank home page
  2. Click [Bank Manager Login]
  3. Click [Home]
  4. Assert button [Customer Login] is visible
  5. Assert button [Bank Manager Login] is visible
  */
  const bankHomePage = new BankHomePage(page);
  const managerPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await managerPage.clickHomeButton();
  await bankHomePage.assertCustomerLoginButtonIsVisible();
  await bankHomePage.assertBankManagerLoginButtonIsVisible();
});