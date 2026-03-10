import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
    const addCustomerPage = new AddCustomerPage(page);
    await addCustomerPage.open();
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postCode = faker.location.zipCode();
    await addCustomerPage.fillTheFirstName(firstName);
    await addCustomerPage.fillTheLastName(lastName);
    await addCustomerPage.fillThePostCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
   const customerListPage = new CustomersListPage(page);
   await customerListPage.open();
   await page.waitForTimeout(3000);
   await customerListPage.fillSearchField(lastName);
   await expect(page.locator('tbody').locator('tr').nth(0)).toContainText(firstName, lastName, postCode);
   await expect(page.locator('tbody').locator('tr').nth(1)).toBeHidden();
});
