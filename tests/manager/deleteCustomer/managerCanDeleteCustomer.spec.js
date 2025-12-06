import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ManagerAddCustomerPage } from '../../../src/pages/manager/ManagerAddCustomerPage';
import { ManagerCustomerListPage } from '../../../src/pages/manager/ManagerCustomerListPage';

let firstName, lastName, postCode;

test.beforeEach(async ({ page }) => {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  const addCustomerPage = new ManagerAddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomer();
  await addCustomerPage.reloadPage();
});

test('Assert manager can delete customer', async ({ page }) => {
  const customerListPage = new ManagerCustomerListPage(page);

  await customerListPage.open();
  await customerListPage.deleteCustomerByName(firstName, lastName);
  await customerListPage.assertCustomerRowNotPresent(firstName, lastName);
  await customerListPage.reloadPage();
  await customerListPage.assertCustomerRowNotPresent(firstName, lastName);  
});
