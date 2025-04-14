import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page)

  await openAccountPage.open();
  await openAccountPage.selectValueFromCurrencyDropdown('Dollar');
  await openAccountPage.assertCurrencyDropdownHasCertainValue('Dollar');

  await openAccountPage.selectValueFromCurrencyDropdown('Pound');
  await openAccountPage.assertCurrencyDropdownHasCertainValue('Pound');

  await openAccountPage.selectValueFromCurrencyDropdown('Rupee');
  await openAccountPage.assertCurrencyDropdownHasCertainValue('Rupee');
});
