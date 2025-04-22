import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


// let firstName;
// let lastName;
// let postalCode; 

const customer = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode()
}

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

test('Assert manager can search customer by Last Name', async ({ page }) => {

const customersListPage = new CustomersListPage(page);

await customersListPage.open();
await customersListPage.fillSearchFieldByLastname(customer.lastName);
await customersListPage
  .assertCostomerInSearchResult(customer.firstName, 
    customer.lastName, customer.postalCode);
await customersListPage.assertOtherRowsAreNotVisible();

  /* 
Test:
1. Open Customers page
2. Fill the lastName to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/


});