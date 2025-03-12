import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

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
  */
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.createCustomer(firstName, lastName, postCode);
});

test('Assert manager can search customer by First Name', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Fill the firstName to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.fillSearchField(firstName);
  await customersListPage.assertFirstNameFieldHaveText(firstName);
  await customersListPage.assertCustomersCount(2);
});