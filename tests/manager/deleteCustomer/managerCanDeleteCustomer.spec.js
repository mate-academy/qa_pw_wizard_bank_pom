import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Customer Management', () => {
  let customerDetails = {}; 

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
await addCustomerPage.waitForOpened();

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode();

await addCustomerPage.fillFirstName(firstName);
await addCustomerPage.fillLastName(lastName);
await addCustomerPage.fillPostCode(postCode);
await addCustomerPage.clickAddCustomerButton();

customerDetails = { firstName, lastName, postCode };
});

test('Assert manager can delete customer', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Click [Delete] for the row with customer name.
3. Assert customer row is not present in the table. 
4. Reload the page.
5. Assert customer row is not present in the table. 
*/
const customersListPage = new CustomersListPage(page); 

await customersListPage.open();
await customersListPage.waitForOpened();
await customersListPage.assertLastRowFirstNameContainsText(customerDetails.firstName);
await customersListPage.assertLastRowLastNameContainsText(customerDetails.lastName);
await customersListPage.assertLastRowPostCodeContainsText(customerDetails.postCode);
await customersListPage.assertDeleteButtonIsVisible();
await customersListPage.clickDeleteButtonForLastRow();

// await customersListPage.waitForRowToBeDetached();
// await customersListPage.waitForRowToBeRemoved();
// await customersListPage.assertLastRowIsHidden();
// await customersListPage.reload();
// await customersListPage.assertLastRowIsHidden();
});

});
