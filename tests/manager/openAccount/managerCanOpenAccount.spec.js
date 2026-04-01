import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage'; 
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';


let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameInput(firstName);
  await addCustomerPage.fillLastNameInput(lastName);
  await addCustomerPage.fillPostCodeInput(postCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can open account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const customersPage = new CustomersListPage(page);
  await openAccountPage.open();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`)
  await openAccountPage.selectCurrency('Dollar')
  await openAccountPage.clickProcessButton()
  await page.reload();
  await customersPage.open();
  await customersPage.assertFirstTableRowContainsText(firstName);
await customersPage.assertLastRowAccountNumberIsNotEmpty();
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
