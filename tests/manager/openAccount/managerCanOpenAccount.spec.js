import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let openAccountPage;
let customersListPage;
let customerFirstName;
let customerLastName;
let postCode;
test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
addCustomerPage = new AddCustomerPage(page);
 
  await addCustomerPage.open();
  customerFirstName = faker.person.firstName(); 
  customerLastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  await addCustomerPage.fillFirstNameField(customerFirstName);
  await addCustomerPage.fillLastNameField(customerLastName);
  await addCustomerPage.fillPostCodeField(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();

});

test('Assert manager can add new customer', async ({ page }) => {
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
openAccountPage = new OpenAccountPage(page);
await addCustomerPage.clickOpenAccountsButton();
await openAccountPage.waitForLoading();
const customerName = `${customerFirstName} ${customerLastName}`;
await openAccountPage.selectCustomerName(customerName);

const currency = faker.helpers.arrayElement(['Dollar', 'Pound', 'Rupee']);
await openAccountPage.selectCurrency(currency);

//await openAccountPage.selectCurrency('Dollar');
await openAccountPage.clickProcessButton();
await page.reload();
await openAccountPage.clickCustomersButton();
customersListPage = new CustomersListPage(page);
  await customersListPage.waitForLoading();
  await customersListPage.checkCustomerLastName(customerLastName);


});


