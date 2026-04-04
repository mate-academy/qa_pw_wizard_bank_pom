import { test } from '@playwright/test';
import { OpenCustomerPage } from '../../../src/pages/manager/OpenAccountPage';
import { faker } from '@faker-js/faker';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenCustomerPage(page);
  const testData = {
    currency: 'Dollar',
    currency1: 'Pound',
    currency2: 'Rupee'
  };

  await openAccountPage.open();
  await openAccountPage.selectCurrencyOption(testData.currency);
  await openAccountPage.assertCurrencyOptionDollar(testData.currency);
  await openAccountPage.selectCurrencyOption(testData.currency1);
  await openAccountPage.assertCurrencyOptionDollar(testData.currency1);
  await openAccountPage.selectCurrencyOption(testData.currency2);
  await openAccountPage.assertCurrencyOptionDollar(testData.currency2);
});

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
