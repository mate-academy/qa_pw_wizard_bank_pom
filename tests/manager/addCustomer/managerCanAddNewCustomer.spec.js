import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { ManagerHomePage } from '../../../src/pages/manager/ManagerHomePage';
import { CustomersPage } from '../../../src/pages/manager/CustomersPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const managerHomePage = new ManagerHomePage(page);
  const customersPage = new CustomersPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();
  await managerHomePage.clickCustomersButton();
  await customersPage.assertLastRowContainsFirstName(firstName);
  await customersPage.assertLastRowContainsLastName(lastName);
  await customersPage.assertLastRowContainsPostCode(postCode);
  await customersPage.assertLastRowAccountNumberIsEmpty();
});