import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {

  const bankHomePage = new BankHomePage(page)
  const bankManagerMainPage = new BankManagerMainPage(page)

  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */

  await bankHomePage.openLoginPage()
  await bankHomePage.waitLoginPage()
  await bankHomePage.clickBankManagerLoginButton()
  await bankManagerMainPage.waitManagerMainPage()
  await bankManagerMainPage.elementVisible(bankManagerMainPage.addCustomerLink)
  await bankManagerMainPage.elementVisible(bankManagerMainPage.openAccountLink)
  await bankManagerMainPage.elementVisible(bankManagerMainPage.customersListLink)

});
