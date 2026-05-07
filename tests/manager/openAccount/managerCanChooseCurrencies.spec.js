import { test,expect } from '@playwright/test';
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
await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');
  
  // Seleciona Dollar e verifica se o valor ativo mudou para Dollar
  await page.locator('#currency').selectOption('Dollar');
  await expect(page.locator('#currency')).toHaveValue('Dollar');
  
  // Seleciona Pound e verifica se o valor ativo mudou para Pound
  await page.locator('#currency').selectOption('Pound');
  await expect(page.locator('#currency')).toHaveValue('Pound');
  
  // Seleciona Rupee e verifica se o valor ativo mudou para Rupee
  await page.locator('#currency').selectOption('Rupee');
  await expect(page.locator('#currency')).toHaveValue('Rupee');
});
