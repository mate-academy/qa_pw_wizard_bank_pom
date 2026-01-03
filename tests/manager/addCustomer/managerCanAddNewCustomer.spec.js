import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  await addCustomerPage.open();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCode(postCode);
  
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.refreshPage();
  await addCustomerPage.clickCustomersButton();

  await customersListPage.assertCustomerInLastRow(firstName, lastName, postCode);
});
