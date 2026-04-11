import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
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
  const accountPage = new OpenAccountPage(page);
  await accountPage.open();  
  await accountPage.selectCurrencyValue('Dollar');
  await accountPage.assertDropDownValue('Dollar');
  await accountPage.selectCurrencyValue('Pound');
  await accountPage.assertDropDownValue('Pound');
  await accountPage.selectCurrencyValue('Rupee');
  await accountPage.assertDropDownValue('Rupee');

});
