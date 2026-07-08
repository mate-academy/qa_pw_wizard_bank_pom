import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {

  /* 
  Pre-conditons:
  1. Open Add Customer page. */

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

});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page. */ 

  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();

  // 2. Click [Delete] for the row with customer name.

  await customersListPage.deleteCustomerByName(firstName, lastName);

  // 3. Assert customer row is not present in the table. 

  await customersListPage.assertCustomerNotPresent(firstName, lastName);

  // 4. Reload the page.

  await customersListPage.reload();

  // 5. Assert customer row is not present in the table. 
  
  await customersListPage.assertCustomerNotPresent(firstName, lastName);
  
  // */
});
