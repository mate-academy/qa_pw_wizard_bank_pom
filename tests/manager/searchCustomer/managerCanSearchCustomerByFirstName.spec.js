import { test, expect } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { faker } from '@faker-js/faker';

let firstName, lastName, postCode;

test.beforeEach(async ({ page }) => {
  const managerMainPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await managerMainPage.open();
  await managerMainPage.goToAddCustomer();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  const managerMainPage = new BankManagerMainPage(page);
  const customersPage = new CustomersListPage(page);

  await managerMainPage.goToCustomers();
  await customersPage.searchCustomer(firstName);

  await customersPage.assertCustomerExists(firstName, lastName);
  await customersPage.assertOnlyOneResult();
});
