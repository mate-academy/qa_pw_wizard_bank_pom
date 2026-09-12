import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const managerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await managerPage.open();
  await managerPage.clickAddCustomerButton();

  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postalCode);
  await addCustomerPage.clickAddCustomerButton();

  await page.reload();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  const managerPage = new BankManagerMainPage(page);
  const customersPage = new CustomersListPage(page);

  await managerPage.clickCustomersButton();

  await customersPage.fillSearchField(firstName);
  await customersPage.assertCustomerIsPresent(firstName);
  await customersPage.assertOnlyOneCustomerRowIsPresent();
});