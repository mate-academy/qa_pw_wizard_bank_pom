import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

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
  await addCustomerPage.fillPostalCode(postCode);
  await addCustomerPage.clickAddCustomer();
});

test('Assert manager can delete customer', async ({ page }) => {
  
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.clickDelete(firstName, lastName);
  await expect(customersListPage.getCustomerRow(firstName, lastName)).toHaveCount(0);
  await page.reload();
  await expect(customersListPage.getCustomerRow(firstName, lastName)).toHaveCount(0);
});