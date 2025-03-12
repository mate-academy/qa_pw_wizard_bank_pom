import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

let firstName;
let lastName;
let postCode;

test.beforeEach( async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.createCustomer(firstName, lastName, postCode);
});

test('Assert manager can add new customer', async ({ page }) => {
/* 
Test:
1. Click [Open Account].
2. Select Customer name you just created.
3. Select currency.
4. Click [Process].
5. Reload the page (This is a simplified step to close the popup).
6. Click [Customers].
7. Assert the customer row has the account number not empty.

Tips:
 1. Do not rely on the customer row id for the step 13. Use the ".last()" locator to get the last row.
*/
  const customersListPage = new CustomersListPage(page);
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomerOption(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrencyOption('Dollar');
  await openAccountPage.clickProcessButton();
  await openAccountPage.reload();
  await openAccountPage.clickCustomersButton();
  await customersListPage.waitForOpen();
  await customersListPage.assertAccountNumberFieldIsNotEmpty();
});