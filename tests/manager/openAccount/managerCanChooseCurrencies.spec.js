import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';


test('Assert manager can choose currencies for account', async ({ page }) => {
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount */
    const openAccount = new OpenAccountPage(page);
    await openAccount.open();

  // 2. Select currency Dollar

    
    await openAccount.selectCurrency('Dollar');

  // 3. Assert the drop-down has value Dollar

    await openAccount.assertCurrencyIs('Dollar'); 

  // 4. Select currency Pound

    await openAccount.selectCurrency('Pound');

  // 5. Assert the drop-down has value Pound

    await openAccount.assertCurrencyIs('Pound');

  // 6. Select currency Rupee

    await openAccount.selectCurrency('Rupee');

  // 7. Assert the drop-down has value Rupee

    await openAccount.assertCurrencyIs('Rupee');
  //
});
