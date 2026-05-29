import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

let customerFullName;

test.beforeEach(async ({ page }) => {
  const customerPage = new AddCustomerPage(page);
  await customerPage.open();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  customerFullName = `${firstName} ${lastName}`;

  await customerPage.fillFirstName(firstName);
  await customerPage.fillSecondName(lastName);
  await customerPage.fillPostalCode(faker.location.zipCode());
  await customerPage.clickAddCustomersButton();
  await customerPage.reloadPage();
});

test('Assert manager can add new customer', async ({ page }) => {
  const accountPage = new OpenAccountPage(page);
  await accountPage.open();
  await accountPage.waitForLoadURL();

  // Select the customer we just created
  await accountPage.selectCustomer(customerFullName);

  // Select currency and process
  await accountPage.selectCurrencyDollar();
  await accountPage.clickProcess();
  await accountPage.reloadPage();

  // Go to customers list and assert account number is not empty
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.clickCustomerButton();

  const lastRow = customersListPage.lastRow;
  const accountNumber = await lastRow.getByRole('cell').nth(2).textContent();
  expect(accountNumber.trim()).not.toBe('');
});