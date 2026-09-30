import { test } from '../../fixtures/manager.fixture';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can open a Pound account for a customer', { tag: '@manager' }, async ({
  page,
  customer,
}) => {
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomer(`${customer.firstName} ${customer.lastName}`);
  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.clickProcessButton();
  await page.reload();

  await customersListPage.clickCustomersButton();
  await customersListPage.assertLastRowContainsText(customer.firstName);
  await customersListPage.assertLastRowContainsText(customer.lastName);
  await customersListPage.assertLastRowAccountNumberIsPresent();
});