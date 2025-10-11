import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickSubmitAddCustomerButton();
  await page.reload();
  await bankManagerMainPage.clickCustomersButton();
  await customersListPage.assertFirstNameIsOnLastRow(firstName);
  await customersListPage.assertLastNameIsOnLastRow(lastName);
  await customersListPage.assertPostalCodeIsOnLastRow(postCode);
  await customersListPage.assertAccountNumberIsEmptyOnLastRow();
});