import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {

  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.openDropDownAndSelectCurrency('Dollar');
  await openAccountPage.assertCurrentCurrency('Dollar');

  await openAccountPage.openDropDownAndSelectCurrency('Pound');
  await openAccountPage.assertCurrentCurrency('Pound');

  await openAccountPage.openDropDownAndSelectCurrency('Rupee');
  await openAccountPage.assertCurrentCurrency('Rupee');
});
