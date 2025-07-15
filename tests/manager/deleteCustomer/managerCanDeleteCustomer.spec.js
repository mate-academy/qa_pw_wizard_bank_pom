import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const addCustomer = new AddCustomerPage(page);
  

  
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();


  await addCustomer.open();
  await addCustomer.fillFirstName(firstName);
  await addCustomer.fillLastName(lastName);
  await addCustomer.fillPostCode(postCode);
  await addCustomer.clickAddCustomer();
  /* 
  Pre-conditions:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersList = new CustomersListPage(page, firstName, lastName, postCode);

  await customersList.open();
  await customersList.clickDeleteCustomerButton();
  await customersList.assertCustomerNotPresent();

  await page.reload();
  await customersList.assertCustomerNotPresent();
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
