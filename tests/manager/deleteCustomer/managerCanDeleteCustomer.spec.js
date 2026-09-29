import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = 'TestFirstName';
  lastName = 'TestLastName';
  postalCode = '123456';

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postalCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersPage = new CustomersListPage(page);

  await customersPage.open();
  await customersPage.deleteCustomer(firstName);
  await customersPage.assertCustomerNotInTable(firstName);

  await page.reload();
  await customersPage.assertCustomerNotInTable(firstName);
});