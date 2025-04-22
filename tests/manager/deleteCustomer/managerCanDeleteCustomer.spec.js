import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName, lastName, postCode;

test.beforeEach( async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);

  postCode = faker.number.int(10000).toString();
  await addCustomerPage.fillPostalCodeField(postCode);
  await addCustomerPage.clickAddCustomerButton();
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  
  const customersName = `${firstName} ${lastName} ${postCode}`;
  await customersListPage.open();
      
  const row = page.getByRole('row', { name: customersName });
  await row.getByRole('button', { name: 'Delete' }).click();
  await expect (page.locator('row', { name: customersName })).toBeHidden(); 
  await page.reload();
  await expect (page.locator('row', { name: customersName })).toBeHidden();
  /* 
Test:
1. Open Customers page
2. Click [Delete] for the row with customer name.
3. Assert customer row is not present in the table. 
4. Reload the page.
5. Assert customer row is not present in the table. 
*/
});