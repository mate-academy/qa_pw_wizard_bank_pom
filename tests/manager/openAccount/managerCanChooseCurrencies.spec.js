import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  // Test:
  // 1. Open the Open account page 
  //   https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  await openAccountPage.open();
  // 2. Select currency Dollar
  await openAccountPage.selectCurrency('Dollar');
  // 3. Assert the drop-dwon has value Dollar
  await openAccountPage.assertSelectedCurrency('Dollar');
  // 4. Select currency Pound
  await openAccountPage.selectCurrency('Pound');
  // 5. Assert the drop-dwon has value Pound
  await openAccountPage.assertSelectedCurrency('Pound');
  // 6. Select currency Rupee
  await openAccountPage.selectCurrency('Rupee');
  // 7. Assert the drop-dwon has value Rupee
  await openAccountPage.assertSelectedCurrency('Rupee');
  await page.waitForTimeout(1000);
});
