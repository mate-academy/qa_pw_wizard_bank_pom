import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

import { faker, fi } from '@faker-js/faker';   
let addCustomerPage;
let customersListPage;

test('Assert manager can add new customer', async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  customersListPage = new CustomersListPage(page);
  await addCustomerPage.open();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postalCode = faker.location.zipCode();
  await addCustomerPage.firstNameField.fill(firstName);
  await addCustomerPage.lastNameField.fill(lastName);
  await addCustomerPage.postalCodeField.fill(postalCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reload();//This is a simplified step to close the popup
  await addCustomerPage.clickCustomersButton();
  await customersListPage.awaitPageLoad();
  const lastCustomerRow = await customersListPage.getLastCustomerRow();
  await customersListPage.assureRowHasFirstName(lastCustomerRow, firstName);
  await customersListPage.assureRowHasLastName(lastCustomerRow, lastName);
  await customersListPage.assureRowHasPostalCode(lastCustomerRow, postalCode);
  await customersListPage.assureUserHasNoAccountNumber(lastCustomerRow);
});
