import { test } from '@playwright/test';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';

test('Assert deleted customer is not available for login', async ({
  page,
}) => {
  /*
  Test:
  1. Open Customers page.
  2. Click [Delete] for "Ron Weasly".
  3. Open Customer Login page.
  4. Assert "Ron Weasly" is not present in the customers drop-down.
  */
  const customersPage = new CustomersListPage(page);
  const customerLoginPage = new CustomerLoginPage(page);

  await customersPage.open();
  await customersPage.clickDeleteForCustomer('Ron', 'Weasly');
  await customersPage.assertCustomerIsNotPresent('Ron', 'Weasly');
  await customerLoginPage.open();
  await customerLoginPage.assertCustomerIsNotInDropdown('Ron Weasly');
});
