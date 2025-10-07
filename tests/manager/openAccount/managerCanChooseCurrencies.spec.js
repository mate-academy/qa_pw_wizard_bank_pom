import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';


test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const dollar = 'Dollar';
  const pound = 'Pound';
  const rupee = 'Rupee';

  await openAccountPage.open();
  await openAccountPage.selectCurrency(dollar);
  await openAccountPage.assertCurrencySelected(dollar);
  await openAccountPage.selectCurrency(pound);
  await openAccountPage.assertCurrencySelected(pound);
  await openAccountPage.selectCurrency(rupee);
  await openAccountPage.assertCurrencySelected(rupee);

});
