import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;

test.beforeEach(async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  
  await bankManagerMainPage.open();
  await bankManagerMainPage.clickAddCustomerButton();
  
  firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();
  await addCustomerPage.createCustomer(firstName, lastName, postCode);
});

test('Assert manager can delete customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  
  await addCustomerPage.clickCustomersButton();
  await customersListPage.deleteCustomerByFirstName(firstName);
});
