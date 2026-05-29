import { test } from '@playwright/test';
import {BankHomePage} from '../../../src/pages/BankHomePage.js'

test('Assert manager can Login', async ({ page }) => {

  const bankHomePage = new BankHomePage(page);
  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();
  await bankHomePage.assertddCustomerButtonAIsVisible();
  await bankHomePage.assertOpenAccountIsVisible();
  await bankHomePage.assertCustomerButtonIsVisible();
});
