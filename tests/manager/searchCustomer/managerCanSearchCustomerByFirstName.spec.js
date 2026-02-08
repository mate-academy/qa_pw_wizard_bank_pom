import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

export let addCustomerPage;
let customersListPage;
export let firstName;
export let lastName;
export let postalCode;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  customersListPage = new CustomersListPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postalCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  await customersListPage.open();
  await customersListPage.searchInSearchField(firstName);
  await customersListPage.assureCustomerExists(firstName);
  await customersListPage.assureCustomersCount(1);
});
