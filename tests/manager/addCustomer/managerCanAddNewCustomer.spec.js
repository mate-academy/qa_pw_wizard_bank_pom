import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersPage } from '../../../src/pages/manager/CustomersPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
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

  await addCustomerPage.clickCustomersTab();

  const lastRow = customersPage.tableRows.last();
  await expect(lastRow).toContainText(firstName);

  await expect(lastRow).toContainText(lastName);

  await expect(lastRow).toContainText(postCode);

  await expect(lastRow.locator('td').nth(3)).toBeEmpty();
});