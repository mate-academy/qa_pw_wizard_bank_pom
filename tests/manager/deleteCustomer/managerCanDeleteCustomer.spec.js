import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let createdFirstName;
let createdLastName;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  createdFirstName = faker.person.firstName();
  createdLastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(createdFirstName);
  await addCustomerPage.fillLastNameField(createdLastName);
  await addCustomerPage.fillPostCodeField(postCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.deleteCustomerByName(createdFirstName, createdLastName);
  await customersListPage.assertCustomerIsNotVisible(createdFirstName, createdLastName);

  await page.reload();

  await customersListPage.assertCustomerIsNotVisible(createdFirstName, createdLastName);
});
