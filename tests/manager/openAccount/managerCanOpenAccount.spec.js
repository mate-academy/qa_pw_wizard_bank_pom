import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ManagerAddCustomerPage } from '../../../src/pages/manager/ManagerAddCustomerPage';
import { ManagerOpenAccountPage } from '../../../src/pages/manager/ManagerOpenAccountPage';
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

test('Assert manager can add new customer', async ({ page }) => {
  const openAccountPage = new ManagerOpenAccountPage(page);
  const customerListPage = new ManagerCustomerListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcess();
  await openAccountPage.reloadPage();
  await customerListPage.open();
  await customerListPage.assertLastRowHasAccountNumber();
});
