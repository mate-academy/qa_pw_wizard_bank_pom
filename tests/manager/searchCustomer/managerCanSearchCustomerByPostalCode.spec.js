import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

let firstName;
let lastName;
let postalCode; 

test.beforeEach( async ({ page }) => {

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode(); 

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode(); 

  const addCustomerPage = new AddCustomerPage(page); 

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameInputField(firstName);
  await addCustomerPage.fillLastNameInputField(lastName);
  await addCustomerPage.fillPostCodeInputField(postalCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {

  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.fillSearchField(postalCode);
  await customersListPage.assertCustomerRowHasPostCode(postalCode);
  await customersListPage.assertCustomerTableContainsSingleRow();
});