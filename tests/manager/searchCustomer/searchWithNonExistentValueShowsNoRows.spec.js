import { test } from '@playwright/test';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert search with non-existent value shows no rows', async ({
  page,
}) => {
  /*
  Test:
  1. Open Customers page.
  2. Fill the non-existent value to the search field.
  3. Assert no rows are present in the table.
  4. Clear the search field.
  5. Assert the table contains 5 default customers.
  */
  const customersPage = new CustomersListPage(page);

  await customersPage.open();
  await customersPage.fillSearchField('NonExistentCustomer');
  await customersPage.assertTableHasRowsCount(0);
  await customersPage.fillSearchField('');
  await customersPage.assertTableHasRowsCount(5);
});
