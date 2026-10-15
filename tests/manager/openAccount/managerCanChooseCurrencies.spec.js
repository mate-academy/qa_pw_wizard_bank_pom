import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
const openAccPage = new OpenAccountPage(page);

await openAccPage.open();
await openAccPage.currDropDown.selectOption('Dollar');
await expect(openAccPage.currDropDown).toHaveValue('Dollar');
await openAccPage.currDropDown.selectOption('Pound');
await expect(openAccPage.currDropDown).toHaveValue('Pound');
await openAccPage.currDropDown.selectOption('Rupee');
await expect(openAccPage.currDropDown).toHaveValue('Rupee');



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
