import { test } from '../../fixtures/manager.fixture';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can add new customer', { tag: '@manager' }, async ({
  page,
  customer,
}) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomer(`${customer.firstName} ${customer.lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await page.reload();
  await customersListPage.clickCustomersButton();
  await customersListPage.assertLastRowAccountNumberIsPresent();
});
