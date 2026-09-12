import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const managerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await managerPage.open();
  await managerPage.clickAddCustomerButton();

  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();

  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  const managerPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersPage = new CustomersListPage(page);

  await managerPage.clickOpenAccountButton();

  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();

  await page.reload();

  await managerPage.clickCustomersButton();

  await customersPage.assertLastRowContainsText(firstName);
  await customersPage.assertLastRowContainsText(lastName);
  await customersPage.assertLastRowContainsText(postCode);
  await customersPage.assertLastRowAccountNumberIsNotEmpty();
});