import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ManagerAddCustomerPage } from '../../../src/pages/manager/ManagerAddCustomerPage';
import { ManagerCustomerListPage } from '../../../src/pages/manager/ManagerCustomerListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  const addCustomerPage = new  ManagerAddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postalCode);
  await addCustomerPage.clickAddCustomer();
  await addCustomerPage.reloadPage(); 
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
  const customerListPage = new ManagerCustomerListPage(page);

  await customerListPage.open();
  await customerListPage.searchCustomerByLastName(lastName);
  await customerListPage.assertCustomerRowPresent(firstName, lastName);
  await customerListPage.assertOnlyOneRowPresent();
});
