import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';

test('Assert manager can Login', async ({ page }) => {

  const bankHomePage = new BankHomePage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await bankHomePage.assertAddCustomerButtonVisible();
  await bankHomePage.assertOpenAccountButtonVisible();
  await bankHomePage.assertCustomersButtonVisible();

});
