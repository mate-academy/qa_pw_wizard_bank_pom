import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostalCode(postalCode);
  await addCustomerPage.clickAddCustomer();
});

test('Assert manager can search customer by Last Name', async ({ page }) => {

  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.fillSearch(lastName);

  await expect(customersListPage.getCustomerRow(firstName, lastName)).toHaveCount(1);
  await expect(customersListPage.allRows).toHaveCount(1);
});