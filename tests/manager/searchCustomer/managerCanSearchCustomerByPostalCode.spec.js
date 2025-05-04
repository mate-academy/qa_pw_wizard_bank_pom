import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { faker } from '@faker-js/faker';

let firstName = faker.person.firstName();
let lastName = faker.person.lastName();
let postalCode = faker.location.zipCode();

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
 
  await addCustomerPage.open(); 
 
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillpostCode(postalCode);
 
  await addCustomerPage.addCustomerButtonClick()


});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Fill the postalCode to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/

const customersListPage = new CustomersListPage(page)

await customersListPage.open();

await customersListPage.searchCustomer(postalCode);

await customersListPage.checkToContainPostCode(postalCode);

// Assert no other rows are present
await customersListPage.checkOneRow();



});