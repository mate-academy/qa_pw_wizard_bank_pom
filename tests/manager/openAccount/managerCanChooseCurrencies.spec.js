import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankHomePage } from '../../../src/pages//BankHomePage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const customerPage = new AddCustomerPage (page);
  const managerMainPage = new BankManagerMainPage (page);
  const listPage = new CustomersListPage (page);
  const accountPage = new OpenAccountPage (page);
  const homePage = new BankHomePage (page);

  await accountPage.open();
  await accountPage.currencyButtonClick();
  await accountPage.selectDollarClick();
  await accountPage.assertDollarValue();
  await accountPage.selectPound();
  await accountPage.assertPoundValue();
  await accountPage.selectRupee();
  await accountPage.assertRupeeValue();
  



  /* 
  Test:
  1. Open the Open account page' 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
});
