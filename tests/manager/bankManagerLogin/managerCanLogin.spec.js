import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login ', async ({ page }) => {

const bankManagerMainPage = new BankManagerMainPage(page); 

await bankManagerMainPage.open();
await bankManagerMainPage.clickBankManagerLoginButton();
await bankManagerMainPage.assertAddCustomerButtonIsVisible();
await bankManagerMainPage.assertOpenAccountButtonIsVisible();
await bankManagerMainPage.assertCustomersButtonIsVisible();
});