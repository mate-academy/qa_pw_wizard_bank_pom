import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersPage } from '../../../src/pages/manager/CustomersPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersPage = new CustomersPage(page);

  await customersPage.open();
  await customersPage.clickDeleteButtonForCustomer(firstName, lastName);
  await customersPage.assertCustomerRowIsNotPresent(firstName, lastName);
  await page.reload();
  await customersPage.assertCustomerRowIsNotPresent(firstName, lastName);
});