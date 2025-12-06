import { test } from '@playwright/test';
import { ManagerLoginPage } from '../../../src/pages/manager/ManagerLoginPage';

test('Assert manager can Login', async ({ page }) => {
  const loginPage = new ManagerLoginPage(page);

  await loginPage.open();
  await loginPage.clickBankManagerLogin();
  await loginPage.assertAddCustomerButtonVisible();
  await loginPage.assertOpenAccountButtonVisible();
  await loginPage.assertCustomersButtonVisible();
});


