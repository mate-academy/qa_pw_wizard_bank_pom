import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const accountPage = new OpenAccountPage(page);
  await accountPage.open();
  await accountPage.waitForLoadURL();
  await accountPage.selectCurrencyDollar();
  await accountPage.assertDropdownHasValueDollar();
  await accountPage.selectCurrencyPound();
  await accountPage.assertDropdownHasValuePound();
  await accountPage.selectCurrencyRupee();
  await accountPage.assertDropdownHasValueRupee();
});