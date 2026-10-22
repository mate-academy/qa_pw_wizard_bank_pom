
import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert bank manager can login', async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank link
  2. Click [Bank Manager Login]
  3. Assert the manager page is opened
  4. Assert [Add Customer], [Open Account] and [Customers] tabs are visible
  */
  const bankHomePage = new BankHomePage(page);
  const managerPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await managerPage.waitForOpened();
  await managerPage.assertTabsAreVisible();
});
