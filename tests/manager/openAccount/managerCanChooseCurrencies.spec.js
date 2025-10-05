import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  await openAccountPage.open();

  const currencySelect = openAccountPage.currencySelect;

  await currencySelect.selectOption('Dollar');
  await expect(currencySelect).toHaveValue('Dollar');

  await currencySelect.selectOption('Pound');
  await expect(currencySelect).toHaveValue('Pound');

  await currencySelect.selectOption('Rupee');
  await expect(currencySelect).toHaveValue('Rupee');
});
