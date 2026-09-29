import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postalCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();
});

test('Assert manager can open account for customer', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const customersPage = new CustomersListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();

  await page.reload();
  await customersPage.open();

  const lastRow = customersPage.tableRows.last();
  await expect(lastRow.locator('td').nth(3)).not.toBeEmpty();
});