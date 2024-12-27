import { test } from '@playwright/test';
import { BankHomePage } from '../../src/pages/BankHomePage';


test('Assert homePage contains Login buttons', async ({ page }) => {

const bankHomePage = new BankHomePage(page); 


await bankHomePage.open();
await bankHomePage.assertCustomerLoginButtonIsVisible();
await bankHomePage.assertBankManagerLoginButtonnIsVisible();

});