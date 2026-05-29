import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';


test('Assert manager can add new customer', async ({ page }) => {

  const customerPage = new AddCustomerPage(page);

  await customerPage.open();
  const firstName = faker.person.firstName();
  await customerPage.fillFirstName(firstName);
  const lastName = faker.person.lastName();
  await customerPage.fillSecondName(lastName);
  const postCode = faker.location.zipCode();
  await customerPage.fillPostalCode(postCode);
  await customerPage.clickAddCustomersButton();
  await customerPage.reloadPage();
  await customerPage.clickCustomerButton();
  await customerPage.assertFirstNameInLastRow(firstName);
  await customerPage.assertLastNameInLastRow(lastName);
  await customerPage.assertPostalCodeInLastRow(postCode);
  await customerPage.assertNoAccountInLastRow();
});