import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can search customers by post code', async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank link, login as manager, click [Customers]
  2. Enter "E55" in [Search Customer] (partial match on post code)
  3. Assert Ron Weasly (E55555) and Albus Dumbledore (E55656) are shown
  */
  const bankHomePage = new BankHomePage(page);
  const managerPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await managerPage.clickCustomersTab();
  await customersListPage.searchCustomer('E55');
  await customersListPage.assertRowsCount(2);
  await customersListPage.assertCustomerIsVisible('Ron', 'Weasley');
  await customersListPage.assertCustomerIsVisible('Albus', 'Dumbledore');
});

