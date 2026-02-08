import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import  { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

let openAccountPage;

test('Assert manager can choose currencies for account', async ({ page }) => {
  openAccountPage = new OpenAccountPage(page);
  const currency1 = 'Dollar';
  const currency2 = 'Pound';
  const currency3 = 'Rupee';

  await openAccountPage.open();
  await openAccountPage.selectCurrency(currency1);
  await openAccountPage
    .assertCurrencyDropdawnHasvalue(currency1);
  await openAccountPage.selectCurrency(currency2);
  await openAccountPage
    .assertCurrencyDropdawnHasvalue(currency2);
  await openAccountPage.selectCurrency(currency3);
  await openAccountPage
    .assertCurrencyDropdawnHasvalue(currency3);
});
