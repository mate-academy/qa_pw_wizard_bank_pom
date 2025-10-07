import { test } from '@playwright/test';
import { af_ZA, faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reloadPage();
  await addCustomerPage.clickCustomersButton();
  await addCustomerPage.assertFirstNameInLastRow(firstName);
  await addCustomerPage.assertLastNameInLastRow(lastName);
  await addCustomerPage.assertPostCodeInLastRow(postCode);
  await addCustomerPage.assertNoAccountNumberInLastRow();
});


