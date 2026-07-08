import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';

let firstName;
let lastName;
let postalCode;
let accountNumber;
let managerMainPage;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page */

  const customerPage = new AddCustomerPage(page);
  await customerPage.open();

  // 2. Fill the First Name.  

  firstName = faker.person.firstName();
  await customerPage.fillFirstName(firstName);

  // 3. Fill the Last Name.

  lastName = faker.person.lastName();
  await customerPage.fillLastName(lastName);

  // 4. Fill the Postal Code.

  postalCode = faker.location.zipCode();
  await customerPage.fillPostCode(postalCode);

  // 5. Click [Add Customer].

  await customerPage.clickAddCustomer();

  // 6. Reload the page (This is a simplified step to close the popup)
  
  managerMainPage = new BankManagerMainPage(page);
  await managerMainPage.reload();
});

test('Assert manager can open account', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account]. */
  
  await managerMainPage.openAccount();

  // 2. Select Customer name you just created.

  const openAccountPage = new OpenAccountPage(page);
  await openAccountPage.selectCustomer(firstName, lastName);

  // 3. Select currency.

  await openAccountPage.selectCurrency('Dollar');

  // 4. Click [Process].

  await openAccountPage.process();

  // 5. Reload the page (This is a simplified step to close the popup).

  await managerMainPage.reload();

  // 6. Click [Customers].

  await managerMainPage.clickCustomersButton();

  // 7. Assert the customer row has the account number not empty.

  const customerPage = new CustomersListPage(page);
  await customerPage.assertLastRowNotEmpty();

  // Tips:
  // 1. Do not rely on the customer row id for the step 13. 
    // Use the ".last()" locator to get the last row.
  // 
});
