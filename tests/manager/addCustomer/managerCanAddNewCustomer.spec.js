import { test, expect } from '@playwright/test';
import { BankManagerMainPage } from '../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../src/pages/manager/AddCustomerPage';
import { faker } from '@faker-js/faker';

test('Manager can add a new customer', async ({ page }) => {
  const bankManagerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  // Open Manager Dashboard
  await bankManagerPage.open();
  await bankManagerPage.goToAddCustomer();

  // Generate fake data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  // Add new customer
  await addCustomerPage.addCustomer(firstName, lastName, postCode);

  // Verify via Customers Page
  await bankManagerPage.goToCustomers();
  await expect(page.locator('table')).toContainText(firstName);
  await expect(page.locator('table')).toContainText(lastName);
});
