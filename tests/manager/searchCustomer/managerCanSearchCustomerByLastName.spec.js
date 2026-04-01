import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
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
  await addCustomerPage.fillFirstNameInput(firstName);
  await addCustomerPage.fillLastNameInput(lastName);
  await addCustomerPage.fillPostCodeInput(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.fillSearchCustomerInput(lastName);
  await customersListPage.assertFirstTableRowContainsText(lastName);
  await customersListPage.assertOnlyOneRowIsVisible();
 
});