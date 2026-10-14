import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  for (const currency of ['Dollar', 'Pound', 'Rupee']) {
    await openAccountPage.selectCurrency(currency);
    await openAccountPage.assertCurrencyDropDownHasValue(currency);
  };
});
