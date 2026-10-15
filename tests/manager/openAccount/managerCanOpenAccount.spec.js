import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager can open account', () => {
  let firstName;
  let lastName;
  let postCode;
  let createdCustomer;
  let createdCustomerName;
  let openAccPage;
  let addCustPage;
  let custListPage;


test.beforeEach(async ({ page }) => {
  addCustPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  


  await addCustPage.open();
  await addCustPage.firstNameField.fill(firstName);
  await addCustPage.lastNameField.fill(lastName);
  await addCustPage.postCodeField.fill(postCode);
  await addCustPage.submitAddCustomerButton.click();
  await page.reload();

  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
});

test('Assert manager can add new customer', async ({ page }) => {
  openAccPage = new OpenAccountPage(page);
  custListPage = new CustomersListPage(page);
  createdCustomer = custListPage.getCreatedCustomerRow(firstName, lastName, postCode);
  createdCustomerName = `${firstName} ${lastName}`;

  await openAccPage.open();
  await openAccPage.userDropDown.selectOption(createdCustomerName);
  await openAccPage.currDropDown.selectOption('Rupee');
  await openAccPage.proccesButton.click();
  await page.reload();
  await openAccPage.customersButton.click();
  await expect(createdCustomer).toBeVisible();


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
});
});
