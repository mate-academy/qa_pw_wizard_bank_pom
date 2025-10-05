import { test, expect } from '@playwright/test';
import { BankManagerMainPage } from '../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../src/pages/manager/CustomersListPage';
import { faker } from '@faker-js/faker';

test('Manager can delete a customer from the list', async ({ page }) => {
  const bankManagerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersPage = new CustomersListPage(page);

  await bankManagerPage.open();

  // Step 1: Add a customer
  await bankManagerPage.goToAddCustomer();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);

  // Step 2: Go to Customers page
  await bankManagerPage.goToCustomers();
  await customersPage.searchCustomer(firstName);
  await customersPage.assertCustomerExists(firstName, lastName);

  // Step 3: Delete that customer
  await customersPage.deleteCustomerByName(firstName);

  // Step 4: Verify they are deleted
  await customersPage.searchCustomer(firstName);
  const count = await customersPage.customerRows.count();
  expect(count).toBe(0);
});
