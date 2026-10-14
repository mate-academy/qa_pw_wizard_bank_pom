import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';

test('Assert manager can Login', async ({ page }) => {

  const bankHomePage = new BankHomePage(page);

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();
  await bankHomePage.assertButtonIsVisible(bankHomePage.addCustomarButton);
  await bankHomePage.assertButtonIsVisible(bankHomePage.openAccountButton);
  await bankHomePage.assertButtonIsVisible(bankHomePage.customersButton);

  
});
