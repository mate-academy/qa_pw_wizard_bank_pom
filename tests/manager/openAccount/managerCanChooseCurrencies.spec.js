import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.assertCurrencyContains('Dollar');
  await openAccountPage.selectCurrencyOption('Dollar');
  await openAccountPage.assertCurrencyContains('Pound');
  await openAccountPage.selectCurrencyOption('Pound');
  await openAccountPage.assertCurrencyContains('Rupee');
  await openAccountPage.selectCurrencyOption('Rupee');
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
});
