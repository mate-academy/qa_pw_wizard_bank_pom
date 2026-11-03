import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
 
  const bankHome = new BankHomePage(page);
  const manageMainPage = new BankManagerMainPage(page);

  await bankHome.open();
  await bankHome.clickManagerLoginButton();

  await page.waitForURL('**/angularJs-protractor/BankingProject/#/manager');
  await manageMainPage.assertButtonAddCustomer();
  await manageMainPage.assertButtonOpenAccount();
  await manageMainPage.assertButtonCustomers();
  
  
});

 /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
 
// await manageMainPage.assertButtons();