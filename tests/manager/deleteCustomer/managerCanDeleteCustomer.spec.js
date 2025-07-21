import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

 
  
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode(); 
  

test.beforeEach(async ({ page }) => {
   const addCustomerPage = new AddCustomerPage(page);

  // Pre-conditons:
  // 1. Open Add Customer page.
  await addCustomerPage.open();
  // 2. Fill the First Name. 
  await addCustomerPage.fillFirstName(firstName);
  // 3. Fill the Last Name.
  await addCustomerPage.fillLastName(lastName);
  // 4. Fill the Postal Code.
  await addCustomerPage.fillPostalCode(postCode);
  // 5. Click [Add Customer].
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {
  
  const customerListPage = new CustomersListPage(page);

  // Test:
  // 1. Open Customers page.
  await customerListPage.open();
  await customerListPage.assertCustomerExist(firstName, lastName);
  // 2. Click [Delete] for the row with customer name.
  await customerListPage.clickDeleteButtonForUser(firstName);
  // 3. Assert customer row is not present in the table. 
  await customerListPage.assertCustomerDoesNotExist(firstName);
  // 4. Reload the page.
  await customerListPage.reload();
  // 5. Assert customer row is not present in the table.
  await customerListPage.assertCustomerDoesNotExist(firstName);
  
});
