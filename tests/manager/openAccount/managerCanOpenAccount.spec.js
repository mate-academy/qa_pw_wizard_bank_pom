import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

let createdFirstName;
let createdLastName;

test.beforeEach( async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  createdFirstName = faker.person.firstName();
  createdLastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(createdFirstName);
  await addCustomerPage.fillLastNameField(createdLastName);
  await addCustomerPage.fillPostCodeField(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reloadPage();
});

test('Assert manager can add new customer', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.selectJustCreatedCustomer(createdFirstName, createdLastName);
  await openAccountPage.selectValueFromCurrencyDropdown('Dollar');
  await openAccountPage.clickProcessButton();
  await openAccountPage.reloadPage();
  await openAccountPage.clickCustomersButton();
  await openAccountPage.assertAccountNumberOfCustomerIsNotEmpty('');
});
