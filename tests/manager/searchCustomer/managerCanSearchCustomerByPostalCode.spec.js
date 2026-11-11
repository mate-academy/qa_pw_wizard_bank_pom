import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postalCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  const addCustPage = new AddCustomerPage(page);
  
    await addCustPage.open();
    await addCustPage.fillFirstNameField(firstName);
    await addCustPage.fillLastNameField(lastName);
    await addCustPage.fillPostCodeField(postalCode);
    await addCustPage.clickSubmitAddCustomerForm();
    await page.reload();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  const custList = new CustomersListPage(page);
  
    await custList.open();
    await custList.fillSearchCustomerPostalCode(postalCode);
    await custList.assertLastCustomer(firstName, lastName, postalCode);
    await custList.assertNoRowsIsPresent();
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
  2. Fill the postalCode to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */