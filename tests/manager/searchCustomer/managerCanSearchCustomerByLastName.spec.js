import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
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
  await addCustomerPage.clickSubmitAddCustomerButton();
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  await bankManagerMainPage.open();
  await bankManagerMainPage.clickCustomersButton();
  await customersListPage.fillSearchCustomerField(lastName);
  await customersListPage.assertCustomerRowIsPresent(firstName,lastName,postCode);
  await customersListPage.assertCustomerRowIsUnique(firstName,lastName,postCode);
});
