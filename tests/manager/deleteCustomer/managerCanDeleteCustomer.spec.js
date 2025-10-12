import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let customersListPage;
let customerFirstName;
let customerLastName;
let customerPostCode;
test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  addCustomerPage = new AddCustomerPage(page);
await addCustomerPage.open();
customerFirstName = faker.person.firstName(); 
await addCustomerPage.fillFirstNameField (customerFirstName);
customerLastName = faker.person.lastName(); 
await addCustomerPage.fillLastNameField (customerLastName);
customerPostCode = faker.location.zipCode();
await addCustomerPage.fillPostCodeField(customerPostCode);
await addCustomerPage.clickAddCustomerButton();
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
customersListPage = new CustomersListPage(page);
await customersListPage.open();
await customersListPage.deleteCreatedUser(customerLastName);
await customersListPage.checkCustomerLastNameIsAbsent(customerLastName);

await page.reload();
await customersListPage.checkCustomerLastNameIsAbsent(customerLastName);
});
