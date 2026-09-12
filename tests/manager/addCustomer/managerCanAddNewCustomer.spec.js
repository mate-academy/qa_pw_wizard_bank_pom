import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  const managerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersPage = new CustomersListPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await managerPage.open();
  await managerPage.clickAddCustomerButton();

  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();

  await page.reload();

  await managerPage.clickCustomersButton();

  await customersPage.assertLastRowContainsText(firstName);
  await customersPage.assertLastRowContainsText(lastName);
  await customersPage.assertLastRowContainsText(postCode);
});