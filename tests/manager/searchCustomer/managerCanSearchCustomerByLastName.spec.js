import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postalCode);
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.fillSearchInput(lastName);
  await customersListPage.assertCustomerRowIsVisible(lastName);
  await customersListPage.assertTableHasRowsCount(1);
});
