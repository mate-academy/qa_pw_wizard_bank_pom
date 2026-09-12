import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  const managerPage = new BankManagerMainPage(page);

  await managerPage.openLoginPage();
  await managerPage.clickManagerLoginButton();

  await managerPage.assertAddCustomerButtonIsVisible();
  await managerPage.assertOpenAccountButtonIsVisible();
  await managerPage.assertCustomersButtonIsVisible();
});