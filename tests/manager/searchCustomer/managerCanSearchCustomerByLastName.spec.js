import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);
  
  await addCustomerPage.open();
  await addCustomerPage.fillField(addCustomerPage.firstName, firstName);
  await addCustomerPage.fillField(addCustomerPage.lastName, lastName);
  await addCustomerPage.fillField(addCustomerPage.postCode, postCode);
  await addCustomerPage.clickButton(addCustomerPage.formButton);
  await addCustomerPage.reloadPage();
});

test('Assert manager can search customer by Last Name', async ({ page }) => {

    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
  
    await addCustomerPage.clickButton(addCustomerPage.customersButton);
    await openAccountPage.fillCusstomerSearchField(lastName);
  
    await openAccountPage.assertSearchCusstomerByData(lastName, openAccountPage.customarLastName);
    await openAccountPage.assertSearchCusstomerAllFields();
});
