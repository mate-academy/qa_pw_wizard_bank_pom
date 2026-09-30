import { test } from '../../fixtures/manager.fixture';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can delete customer', { tag: '@manager' }, async ({
  page,
  customer,
}) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.clickDeleteForCustomer(customer.firstName, customer.lastName);
  await customersListPage.assertCustomerIsHidden(customer.firstName, customer.lastName);
  await page.reload();
  await customersListPage.assertCustomerIsHidden(customer.firstName, customer.lastName);
});
