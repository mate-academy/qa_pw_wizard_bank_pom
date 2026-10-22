import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  const bankHomePage = new BankHomePage(page);
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLogin();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostalCode(postCode);
  await addCustomerPage.clickAddCustomer();
});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */

  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.clickDelete(firstName, lastName);

  await expect(customersListPage.getCustomerRow(firstName, lastName)).toHaveCount(0);

  await page.reload();

  await expect(customersListPage.getCustomerRow(firstName, lastName)).toHaveCount(0);
});