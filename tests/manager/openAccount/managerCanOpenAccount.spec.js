import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test.describe('Bank Manager can open account', () => {
  let addCustomerPage;
  let openAccountPage;
 const firstName = faker.person.firstName();
 const lastName = faker.person.lastName();
 const postalCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  // #region Pre-conditons: Add new customer
  /* 
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
 // #endregion
 openAccountPage = new OpenAccountPage(page);
 addCustomerPage = new AddCustomerPage(page);

 await addCustomerPage.open();
 await addCustomerPage.firstNameField.fill(firstName);
 await addCustomerPage.lastNameField.fill(lastName);
 await addCustomerPage.postCodeField.fill(postalCode);
 await addCustomerPage.addCustomerButton.click();

 await page.reload();
 await openAccountPage.open();
});

test('Assert manager can open account for existing customer', async ({ page }) => {
  // #region Task: Assert manager can open account for existing customer
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  // #endregion
 await openAccountPage.customer.selectOption({ label: `${firstName} ${lastName}` });
 await openAccountPage.currency.selectOption({ label: 'Dollar' });
 await page.getByRole('button', { name: 'Process' }).click();

 await page.reload();
 await addCustomerPage.customersButton.click();

 await expect(addCustomerPage.lastrowFirstName).toHaveText(firstName);
 await expect(addCustomerPage.lastrowLastName).toHaveText(lastName);
 await expect(addCustomerPage.lastrowPostCode).toHaveText(postalCode);
 await expect(addCustomerPage.lastrowAccountNumber).not.toBeEmpty();
});
});