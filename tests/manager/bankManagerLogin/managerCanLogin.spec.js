import { test, expect } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankHomePage } from '../../../src/pages//BankHomePage';

test('Assert manager can Login', async ({ page }) => {

  const customerPage = new AddCustomerPage (page);
  const managerMainPage = new BankManagerMainPage (page);
  const listPage = new CustomersListPage (page);
  const accountPage = new OpenAccountPage (page);
  const homePage = new BankHomePage (page);

  await homePage.open();
  
  await homePage.bankManagerLoginButtonClick();
  await managerMainPage.waitForOpened();
  
  await managerMainPage.addCustomerButtonVisible();
  await managerMainPage.openAccountButtonVisible();
  await managerMainPage.customersButtonVisible();

  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
});
