import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode(); 

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickButtonAddCustomer();
  await addCustomerPage.reloadPage();
  await addCustomerPage.clickButtonCustomer();
});

test('Assert manager can delete customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.waitForCustomerUrl();
  await addCustomerPage.clickDeleteCustomer();

  await addCustomerPage.assertDeletedCustomerRaw();

  await addCustomerPage.reloadPage();
  await addCustomerPage.assertDeletedCustomerRaw();
});

/* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
/* 
  
Test:
  
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
