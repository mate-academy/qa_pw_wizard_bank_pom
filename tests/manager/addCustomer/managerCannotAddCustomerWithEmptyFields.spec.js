import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager cannot add customer with empty fields', async ({
  page,
}) => {
  /*
  Test:
  1. Open Add Customer page.
  2. Click [Add Customer] without filling the fields.
  3. Click [Customers].
  4. Assert the table contains only 5 default customers.
  */
  const addCustomerPage = new AddCustomerPage(page);
  const managerPage = new BankManagerMainPage(page);
  const customersPage = new CustomersListPage(page);

  await addCustomerPage.open();
  await addCustomerPage.clickAddCustomer();
  await managerPage.clickCustomersButton();
  await customersPage.assertTableHasRowsCount(5);
});
