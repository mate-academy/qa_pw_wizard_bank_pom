import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
/* 
Test:
1. Open the Open account page https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
2. Select currency Dollar
3. Assert the drop-dwon has value Dollar
4. Select currency Pound
5. Assert the drop-dwon has value Pound
6. Select currency Rupee
7. Assert the drop-dwon has value Rupee
*/
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.selectItemInCurrencySelectList('Dollar');
  await openAccountPage.assertCurrencyListInputValue('Dollar');
  await openAccountPage.selectItemInCurrencySelectList('Pound');
  await openAccountPage.assertCurrencyListInputValue('Pound');
  await openAccountPage.selectItemInCurrencySelectList('Rupee');
  await openAccountPage.assertCurrencyListInputValue('Rupee');
});