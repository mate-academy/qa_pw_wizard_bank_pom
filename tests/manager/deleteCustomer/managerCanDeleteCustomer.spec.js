import { test} from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {

  addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  firstName = await addCustomerPage.addFakeCustomerFirstName();
  lastName = await addCustomerPage.addFakeCustomerLastName();
  postalCode = await addCustomerPage.addFakeCustomerPostCode();
  await addCustomerPage.addCustomerButtonClick();
});

test('Assert manager can delete customer', async ({ page }) => {

  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.deleteLastCustomer();
  await customersListPage.assertCustomerRowIsNotPresent(firstName, lastName, postalCode);
  await page.reload();
  await customersListPage.assertCustomerRowIsNotPresent(firstName, lastName, postalCode);

});
