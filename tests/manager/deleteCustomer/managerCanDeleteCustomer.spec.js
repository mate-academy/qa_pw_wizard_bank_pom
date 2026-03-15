import { test, expect } from '@playwright/test';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

import { faker } from '@faker-js/faker';

let firstName;
let lastName;
let postCode;


test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  
  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillZipCode(postCode);
  await addCustomerPage.clickAddCustomerButton();

  await page.reload();
  

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
  const customersListPage = new CustomersListPage(page);

  await addCustomerPage.clickCustomersButton();
  
  await customersListPage.clickDeleteButton(`${firstName} ${lastName}`);

  const table = page.locator('table');
  await expect(page.locator('tr', { hasText: `${firstName} ${lastName}` })).toHaveCount(0);
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});


