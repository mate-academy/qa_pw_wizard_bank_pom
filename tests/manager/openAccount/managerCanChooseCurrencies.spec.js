import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {

const openAccountPage = new OpenAccountPage(page);

await openAccountPage.open();
await openAccountPage.setCurrency('Dollar');
await openAccountPage.assertCurrencyDropDownHasText('Dollar');
await openAccountPage.setCurrency('Pound');
await openAccountPage.assertCurrencyDropDownHasText('Pound');
await openAccountPage.setCurrency('Rupee');
await openAccountPage.assertCurrencyDropDownHasText('Rupee');
});