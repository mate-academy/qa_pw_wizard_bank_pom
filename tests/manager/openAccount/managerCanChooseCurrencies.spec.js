import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Assert manager can choose currencies for account', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');

  const currencyDropdown = page.locator('select[ng-model="currency"]');

  await currencyDropdown.selectOption('Dollar');
  await expect(currencyDropdown).toHaveValue('Dollar');

  await currencyDropdown.selectOption('Pound');
  await expect(currencyDropdown).toHaveValue('Pound');

  await currencyDropdown.selectOption('Rupee');
  await expect(currencyDropdown).toHaveValue('Rupee');
});