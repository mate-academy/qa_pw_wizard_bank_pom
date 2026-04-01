import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  await managerPage.assertAddCustomerButtonIsVisible();
  await managerPage.assertOpenAccountButtonIsVisible();
  await managerPage.assertCustomersButtonIsVisible();
});
