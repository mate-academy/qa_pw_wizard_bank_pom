import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test.describe('Bank Manager can choose currencies for account', () => {
  let openAccountPage;

  test.beforeEach(async ({ page }) => {
    openAccountPage = new OpenAccountPage(page);
    await openAccountPage.open();
  });

test('Assert manager can choose currencies for account', async ({ page }) => {
  // #region Task: Assert manager can choose currencies for account
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
 // #endregion
 await openAccountPage.currency.selectOption('Dollar');
 await expect(openAccountPage.currency).toHaveValue('Dollar');

 await openAccountPage.currency.selectOption('Pound');
 await expect(openAccountPage.currency).toHaveValue('Pound');

 await openAccountPage.currency.selectOption('Rupee');
 await expect(openAccountPage.currency).toHaveValue('Rupee');
});
});