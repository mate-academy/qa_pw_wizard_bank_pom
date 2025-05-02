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

test('Assert manager can search customer by Last Name', async ({ page }) => {
const customerListPage = new CustomersListPage(page);

await customerListPage.open();
await customerListPage.clickSearchField();
await customerListPage.fillDateInTheSearchField(lastName);
await customerListPage.visibelCustomersDate(lastName);
await customerListPage.assertOnlyOneRowVisible();

});

  /* 
Test:
1. Open Customers page
2. Fill the lastName to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/
