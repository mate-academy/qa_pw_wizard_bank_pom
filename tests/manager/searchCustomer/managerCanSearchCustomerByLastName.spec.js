import { test } from '../../fixtures/manager.fixture';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can search customer by Last Name', { tag: '@manager' }, async ({
  page,
  customer,
}) => {
  /* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.searchCustomer(customer.lastName);
  await customersListPage.assertOnlyCustomerIsVisible(customer.firstName, customer.lastName);
});
