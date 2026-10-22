import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can delete a customer', async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank link and login as manager
  2. Click [Customers]
  3. Click [Delete] for Albus Dumbledore
  4. Assert Albus Dumbledore is no longer in the list
  5. Assert the other 4 customers are still in the list
  */
  const bankHomePage = new BankHomePage(page);
  const managerPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await managerPage.clickCustomersTab();
  await customersListPage.assertCustomerIsVisible('Albus', 'Dumbledore');
  await customersListPage.deleteCustomer('Albus', 'Dumbledore');

  await customersListPage.assertCustomerIsNotVisible('Albus', 'Dumbledore');
  await customersListPage.assertRowsCount(4);
  await customersListPage.assertCustomerIsVisible('Harry', 'Potter');
});
