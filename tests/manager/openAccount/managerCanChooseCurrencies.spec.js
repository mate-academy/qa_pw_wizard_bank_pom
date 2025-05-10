import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage  } from '../../../src/pages/manager/OpenAccountPage';


test('Assert manager can choose currencies for account', async ({ page }) => {
const openAccountPage = new OpenAccountPage(page);

await openAccountPage.open();
await openAccountPage.assertSelectCurrencyDropdownIsVisible();
await openAccountPage.selectCurrency('Dollar');
await openAccountPage.assertSelectCurrencyDropdownContainsValue('Dollar');
await openAccountPage.selectCurrency('Pound');
await openAccountPage.assertSelectCurrencyDropdownContainsValue('Pound');
await openAccountPage.selectCurrency('Rupee');
await openAccountPage.assertSelectCurrencyDropdownContainsValue('Rupee');
});