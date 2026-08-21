import { test } from '@playwright/test';
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
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reloadPage();
  await addCustomerPage.clickOpenAccountTab();
});

test('Assert manager can add new customer', async ({ page }) => {

  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage (page);
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await openAccountPage.reloadPage();
  await openAccountPage.clickCustomersTab();
  await customersListPage.assertLastCustomerAccountNumberIsNotEmpty();

});
