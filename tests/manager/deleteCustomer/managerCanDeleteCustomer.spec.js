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

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPag = new CustomersListPage(page);
  

  await customersListPag.open();
  await customersListPag.assertLastRowContains(firstName, lastName, postCode);
  await customersListPag.clickDeletLastButton();
  await customersListPag.assertCustomerIsNotInTable(firstName, lastName, postCode);
  await customersListPag.reloadPage(); 
  await customersListPag.assertCustomerIsNotInTable(firstName, lastName, postCode);
});


/* 
Test:
1. Open Customers page
2. Click [Delete] for the row with customer name.
3. Assert customer row is not present in the table. 
4. Reload the page.
5. Assert customer row is not present in the table. 
*/
/* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */