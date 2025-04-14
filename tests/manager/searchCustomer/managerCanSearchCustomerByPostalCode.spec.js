import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let createdFirstName;
let createdLastName;
let createdPostalCode;

test.beforeEach( async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  createdFirstName = faker.person.firstName();
  createdLastName = faker.person.lastName();
  createdPostalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(createdFirstName);
  await addCustomerPage.fillLastNameField(createdLastName);
  await addCustomerPage.fillPostCodeField(createdPostalCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.fillCertainValueInSearchField(createdPostalCode);
  await customersListPage.assertCustomerRowIsPresentInTable(createdFirstName, createdLastName, createdPostalCode);
  await customersListPage.assertNoOtherRowsIsPresentInTable();
});
