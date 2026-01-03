import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let customerFullName;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  const zipCode = faker.location.zipCode();
  customerFullName = `${firstName} ${lastName}`;

  await addCustomerPage.createCustomer(firstName, lastName, zipCode);
});

test('Assert manager can open an account for a new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await addCustomerPage.clickOpenAccountButton();

  await openAccountPage.selectUser(customerFullName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();

  await addCustomerPage.clickCustomersButton();
  await customersListPage.assertLastCustomerHasAccountNumber();
});
