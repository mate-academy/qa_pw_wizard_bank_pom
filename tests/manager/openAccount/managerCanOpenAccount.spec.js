import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName, lastName, postCode;

test.beforeEach( async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();

  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);

  postCode = faker.number.int(10000).toString();
  await addCustomerPage.fillPostalCodeField(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);
  await addCustomerPage.clickOpenAccountButton();

  const customerName = `${firstName} ${lastName}`;
  
  await openAccountPage.selectCustomerName(customerName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await page.reload();
  await openAccountPage.clickCustomersButton();
  await customersListPage.assertLastRowForthCellContainsText('');
});