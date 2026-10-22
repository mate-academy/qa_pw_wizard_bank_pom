import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  /*
  Test:
  1. Open the manager page and go to the Open Account tab
  2. Select currency Dollar
  3. Assert the drop-down has value Dollar
  4. Select currency Pound
  5. Assert the drop-down has value Pound
  6. Select currency Rupee
  7. Assert the drop-down has value Rupee
  */

  const managerPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);

  await managerPage.open();
  await managerPage.clickOpenAccountTab();

  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.assertCurrencyIsSelected('Dollar');

  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.assertCurrencyIsSelected('Pound');

  await openAccountPage.selectCurrency('Rupee');
  await openAccountPage.assertCurrencyIsSelected('Rupee');
});