import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page)
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reloadPage();
  await addCustomerPage.clickCustomersButton();
  await addCustomerPage.assertFirstNameOfLastRow(firstName);
  await addCustomerPage.assertLastNameOfLastRow(lastName);
  await addCustomerPage.assertPostCodeOfLastRow(postCode);
  await addCustomerPage.assertAccountNumberOfLastRowIsEmpty('');
});
