import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();

  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.assertSelectedCurrency('Dollar');

  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.assertSelectedCurrency('Pound');

  await openAccountPage.selectCurrency('Rupee');
  await openAccountPage.assertSelectedCurrency('Rupee');
});

