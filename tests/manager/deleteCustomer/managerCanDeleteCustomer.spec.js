import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /*
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostalCode(postalCode);
  await addCustomerPage.clickAddCustomer();
});

test('Assert manager can delete customer', async ({ page }) => {
  /*
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table.
  4. Reload the page.
  5. Assert customer row is not present in the table.
  */
  const customersPage = new CustomersListPage(page);

  await customersPage.open();
  await customersPage.assertCustomerIsPresent(firstName, lastName);
  await customersPage.clickDeleteForCustomer(firstName, lastName);
  await customersPage.assertCustomerIsNotPresent(firstName, lastName);
  await page.reload();
  await customersPage.assertCustomerIsNotPresent(firstName, lastName);
});
