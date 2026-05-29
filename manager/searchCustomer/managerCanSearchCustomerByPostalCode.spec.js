import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';


let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  const customerPage = new AddCustomerPage(page);
        await customerPage.open();
        firstName = faker.person.firstName();
        await customerPage.fillFirstName(firstName);
        lastName = faker.person.lastName();
        await customerPage.fillSecondName(lastName);
        postalCode = faker.location.zipCode();
        await customerPage.fillPostalCode(postalCode);
        await customerPage.clickAddCustomersButton();
});
test('Assert manager can search customer by Postal Code', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Fill the postalCode to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.3
  */
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.clickCustomerButton();
  await customersListPage.fillInSearchInput(postalCode);
  await expect(page.getByText(postalCode)).toBeVisible();
  const rowCountAfterSearch = await page.getByRole('row').count();
  const rowsWithName = await page.getByRole('row').filter({ hasText: postalCode }).count();
  expect(rowsWithName).toBe(rowCountAfterSearch - 1);

});
