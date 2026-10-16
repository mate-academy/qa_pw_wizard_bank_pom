import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can delete a customer', async ({ page }) => {
    /*
  Test:
  1. Add a new customer (setup, via UI) so we have someone safe to delete.
  2. Reload and go to Customers.
  3. Search for the new customer by Postal Code (more unique than first name
     in this shared, public environment).
  4. Assert only that customer's row is visible.
  5. Click [Delete] on that row.
  6. Assert the row is no longer visible.
  */
  const addCustomerPage = new AddCustomerPage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  // Setup: create a customer to delete
  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostalCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reload();
  await bankManagerMainPage.clickCustomersButton();

   // Act
  await customersListPage.searchCustomer(postCode);
  await customersListPage.assertCustomerRowIsVisible(postCode);
  await customersListPage.clickDeleteButtonForRow(postCode);

  // Assert
  await customersListPage.assertCustomerRowIsHidden(postCode);
});