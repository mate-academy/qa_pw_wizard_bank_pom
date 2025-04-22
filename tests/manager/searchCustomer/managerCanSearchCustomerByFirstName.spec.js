import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

const customer = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode()
}


// let firstName;
// let lastName;
// let postalCode; 

test.beforeEach( async ({ page }) => {

const addCustomerPage = new AddCustomerPage(page);

await addCustomerPage.open();
await addCustomerPage.fillFirstName(customer.firstName);
await addCustomerPage.fillLastName(customer.lastName);
await addCustomerPage.fillPostCodeField(customer.postalCode);
await addCustomerPage.clickAddCustomerButton();

 
 
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  // firstName = faker.person.firstName();
  // lastName = faker.person.lastName();
  // postalCode = faker.location.zipCode(); 


});

test('Assert manager can search customer by First Name', async ({ page }) => {

const costomersListPage = new CustomersListPage(page);
await costomersListPage.open();
await costomersListPage.fillSearchFieldByUsername(customer.firstName);
await costomersListPage
  .assertCostomerInSearchResult(customer.firstName, customer.lastName, customer.postalCode);
await costomersListPage.assertOtherRowsAreNotVisible();

await page.waitForTimeout(2000);

/* 
Test:
1. Open Customers page
2. Fill the firstName to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/


});