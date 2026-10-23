
import { test, expect } from '@playwright/test';

test('Assert manager can choose currencies for account', async ({ page }) => {
  await page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');

  const currencyDropdown = page.locator('#currency');

  await currencyDropdown.selectOption({ label: 'Dollar' });
  await expect(currencyDropdown).toHaveValue('Dollar');

  await currencyDropdown.selectOption({ label: 'Pound' });
  await expect(currencyDropdown).toHaveValue('Pound');

  await currencyDropdown.selectOption({ label: 'Rupee' });
  await expect(currencyDropdown).toHaveValue('Rupee');
});
