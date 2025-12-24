import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage'
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode(); 
  await addCustomerPage.open()
  await addCustomerPage.fillCustomerFirstName(firstName);
  await addCustomerPage.fillCustomerLastName(lastName);
  await addCustomerPage.fillPostalCodeField(postCode);
  await addCustomerPage.clickCustomerButton();
  await addCustomerPage.clickCustomerListButton();
  await customersListPage.assertLastRow(firstName);
  await customersListPage.assertLastRow(lastName);
  await customersListPage.assertLastRow(postCode);
  await customersListPage.assertAccountNumberIsEmpty();
});
