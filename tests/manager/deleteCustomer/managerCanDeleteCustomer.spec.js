import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postCode);
  await addCustomerPage.clickSubmitButton();

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
  const customerListPage = new CustomersListPage(page);

  await customerListPage.open();
  await customerListPage.clickDeleteCustomerButton(firstName, lastName, postCode);
  await customerListPage.assertDeletedCustomerRowisHidden(firstName, lastName, postCode);
  await customerListPage.reload();
  await customerListPage.assertDeletedCustomerRowisHidden(firstName, lastName, postCode);
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
