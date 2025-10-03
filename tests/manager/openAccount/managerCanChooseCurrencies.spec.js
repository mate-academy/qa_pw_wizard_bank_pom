import { expect, test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage'



test('Assert manager can choose currencies for account', async ({ page }) => {

  const accountPage = new OpenAccountPage(page)

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

  await accountPage.openManagerAccount()
  await accountPage.waitForOpenManagerAccount()
  await expect(accountPage.currency).toBeVisible()
  await accountPage.selectCurrency('Dollar')
  await accountPage.assertCurrency('Dollar')
  await accountPage.selectCurrency('Pound')
  await accountPage.assertCurrency('Pound')
  await accountPage.selectCurrency('Rupee')
  await accountPage.assertCurrency('Rupee')

});
