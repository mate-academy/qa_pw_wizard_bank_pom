import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can search a customer by first name', async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank link, login as manager, click [Customers]
  2. Enter "Harry" in [Search Customer]
  3. Assert only Harry Potter is shown
  */
  const bankHomePage = new BankHomePage(page);
  const managerPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await managerPage.clickCustomersTab();
  await customersListPage.searchCustomer('Harry');
  await customersListPage.assertRowsCount(1);
  await customersListPage.assertCustomerIsVisible('Harry', 'Potter');
});
