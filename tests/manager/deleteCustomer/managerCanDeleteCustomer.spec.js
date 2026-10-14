import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let lastName;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  const firstName = faker.person.firstName();
  const postCode = faker.location.zipCode();
  lastName = faker.person.lastName();

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.assertCustomerRowIsVisible(lastName);
  await customersListPage.clickDeleteButtonForCustomer(lastName);
  await customersListPage.assertCustomerRowIsNotPresent(lastName);
  await customersListPage.reload();
  await customersListPage.assertCustomerRowIsNotPresent(lastName);
});

