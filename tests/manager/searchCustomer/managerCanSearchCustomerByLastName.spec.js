import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { generateCustomerData } from '../../../src/data/customerData';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let customerData;
let bankManagerMainPage;
let customersListPage;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  addCustomerPage = new AddCustomerPage(page);
  bankManagerMainPage = new BankManagerMainPage(page);
  customersListPage = new CustomersListPage(page);
  customerData = generateCustomerData();
 
  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameForm(customerData.firstName);
  await addCustomerPage.fillLastNameForm(customerData.lastName);
  await addCustomerPage.fillPostCodeForm(customerData.postCode);
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

  await bankManagerMainPage.clickCustomersButton();
  await customersListPage.search(customerData.lastName);
  await customersListPage.assertCustomerRowPresent(customerData.lastName);
  await customersListPage.assertNoOtherRowsPresent();
});
