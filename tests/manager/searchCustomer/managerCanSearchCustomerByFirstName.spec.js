import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode(); 

test.beforeEach( async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLasttName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustonerButton();
 
});

test('Assert manager can search customer by First Name', async ({ page }) => {

const customerListPage = new CustomersListPage(page);

await customerListPage.open();
await customerListPage.clickSearchField();
await customerListPage.fillDateInTheSearchField(firstName);
await customerListPage.visibelCustomersDate(firstName);
await customerListPage.assertOnlyOneRowVisible();


});

 /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  /* 
Test:
1. Open Customers page
2. Fill the firstName to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/