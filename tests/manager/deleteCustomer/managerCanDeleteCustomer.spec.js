import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();
  await addCustomerPage.fillTheFirstName(firstName);
  await addCustomerPage.fillTheLastName(lastName);
  await addCustomerPage.fillThePostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.openCustomersPage();
  await addCustomerPage.clickDeleteLastCustomerButton();
  await addCustomerPage.assertlastCustomerRowIsHidden();
  await addCustomerPage.reload();
  await addCustomerPage.assertlastCustomerRowIsHidden();
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
