import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { ManagerHomePage } from '../../../src/pages/manager/ManagerHomePage';

test('Assert manager can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerHomePage = new ManagerHomePage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await managerHomePage.assertAddCustomerButtonIsVisible();
  await managerHomePage.assertOpenAccountButtonIsVisible();
  await managerHomePage.assertCustomersButtonIsVisible();
});