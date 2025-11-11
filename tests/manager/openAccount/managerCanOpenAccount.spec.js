import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { ManagerHomePage } from '../../../src/pages/manager/ManagerHomePage';
import { CustomersPage } from '../../../src/pages/manager/CustomersPage';

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
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  const managerHomePage = new ManagerHomePage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersPage = new CustomersPage(page);

  await managerHomePage.clickOpenAccountButton();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await page.reload();
  await managerHomePage.clickCustomersButton();
  await customersPage.assertLastRowAccountNumberIsNotEmpty();
});