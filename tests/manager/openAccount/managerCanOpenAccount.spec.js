import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { generateCustomerData } from '../../../src/data/customerData';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let customerData;
let bankManagerMainPage;
let openAccountPage;
let customersListPage;

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
 bankManagerMainPage = new BankManagerMainPage(page);
 openAccountPage = new OpenAccountPage(page);
 customersListPage = new CustomersListPage(page);
 customerData = generateCustomerData();


 

 await addCustomerPage.open();
 await addCustomerPage.fillFirstNameForm(customerData.firstName);
 await addCustomerPage.fillLastNameForm(customerData.lastName);
 await addCustomerPage.fillPostCodeForm(customerData.postCode);
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
await bankManagerMainPage.clickOpenAccountButton();
await openAccountPage.selectUser(customerData.firstName, customerData.lastName);
await openAccountPage.selectCurrency('Pound');
await openAccountPage.clickProcessButton();
await page.reload();
await bankManagerMainPage.clickCustomersButton();
await customersListPage.assertLastRowAccountNumberNotEmpty();



  
});
