import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
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
  await page.reload();
});

test('Assert manager can open account', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);
  await openAccountPage.clickOpenAccount();
  await openAccountPage.selectCustomer(firstName, lastName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcess();
  await page.reload();
  await addCustomerPage.clickCustomerButton();
  await expect(customersListPage.accountNumberCell).not.toHaveText('');
});