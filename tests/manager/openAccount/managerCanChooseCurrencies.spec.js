import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

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
  await page.goto(
    'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount'
  );

  // Locate currency dropdown
  const currencyDropdown = page.locator('#currency');

  // 2. Select Dollar
  await currencyDropdown.selectOption('Dollar');

  // 3. Assert value is Dollar
  await expect(currencyDropdown).toHaveValue('Dollar');

  // 4. Select Pound
  await currencyDropdown.selectOption('Pound');

  // 5. Assert value is Pound
  await expect(currencyDropdown).toHaveValue('Pound');

  // 6. Select Rupee
  await currencyDropdown.selectOption('Rupee');

  // 7. Assert value is Rupee
  await expect(currencyDropdown).toHaveValue('Rupee');
});
