import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';

test('Assert manager can Login ', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await bankHomePage.assertAddCustomerButtonIsVisible();
  await bankHomePage.assertOpenAccountButtonIsVisible();
  await bankHomePage.assertCustomersButtonIsVisible();
});
