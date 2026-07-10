import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test.describe('Bank Manager can search customer by Last Name', () => {
  let addCustomerPage;
  let customersListPage;

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postalCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  // #region Pre-conditons: Add new customer
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
//  #endregion
addCustomerPage = new AddCustomerPage(page);
customersListPage = new CustomersListPage(page);

 await addCustomerPage.open();
 await addCustomerPage.firstNameField.fill(firstName);
 await addCustomerPage.lastNameField.fill(lastName);
 await addCustomerPage.postCodeField.fill(postalCode);
 await addCustomerPage.addCustomerButton.click();

 await customersListPage.open();
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
  // #region Task: Assert manager can search customer by Last Name
  /* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
//  #endregion
  await customersListPage.searchField.fill(lastName);
  await expect(customersListPage.customerRow).toHaveCount(1);
});
});