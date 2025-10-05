import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/manager/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  const homePage = new BankHomePage(page);
  const managerPage = new BankManagerMainPage(page);

  await homePage.open();
  await homePage.clickBankManagerLoginButton();

  await managerPage.assertManagerPageIsVisible();
});
