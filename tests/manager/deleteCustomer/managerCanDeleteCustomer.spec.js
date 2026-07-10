import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Bank Manager can delete customer', () => {
  let addCustomerPage;
  let customersListPage;
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  // #region Pre-conditons
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
 // #endregion
 addCustomerPage = new AddCustomerPage(page);
 customersListPage = new CustomersListPage(page);
 
 await addCustomerPage.open();
 await addCustomerPage.firstNameField.fill(firstName);
 await addCustomerPage.lastNameField.fill(lastName);
 await addCustomerPage.postCodeField.fill(postCode);
 await addCustomerPage.addCustomerButton.click();
});

test('Assert manager can delete customer', async ({ page }) => {
  // #region Task: Assert manager can delete customer
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
 // #endregion
 await customersListPage.open();
 await customersListPage.deleteLastCustomerButton.click();
 await expect(customersListPage.lastCustomerRow).not.toContainText(firstName);
 await expect(customersListPage.lastCustomerRow).not.toContainText(lastName);
 await expect(customersListPage.lastCustomerRow).not.toContainText(postCode);

 await page.reload();

 await expect(customersListPage.lastCustomerRow).not.toContainText(firstName);
 await expect(customersListPage.lastCustomerRow).not.toContainText(lastName);
 await expect(customersListPage.lastCustomerRow).not.toContainText(postCode);
});
});