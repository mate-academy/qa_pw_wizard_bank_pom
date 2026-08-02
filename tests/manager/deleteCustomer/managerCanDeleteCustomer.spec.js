import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { generateCustomerData } from '../../../src/data/customerData';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

let customersListPage;
let addCustomerPage;
let customerData;
let bankManagerMainPage;

test.beforeEach(async ({ page }) => {

   /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
 
   addCustomerPage = new AddCustomerPage(page);
   customersListPage = new CustomersListPage(page);
   customerData = generateCustomerData();
   bankManagerMainPage = new BankManagerMainPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameForm(customerData.firstName);
  await addCustomerPage.fillLastNameForm(customerData.lastName);
  await addCustomerPage.fillPostCodeForm(customerData.postCode);
  await addCustomerPage.clickAddCustomerButton();

});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */

  await bankManagerMainPage.clickCustomersButton();
  await customersListPage.clickDeleteCustomer(customerData.firstName, customerData.lastName);
  await customersListPage.assertCustomerNotPresent(customerData.firstName, customerData.lastName);
  await page.reload();
  await customersListPage.assertCustomerNotPresent(customerData.firstName, customerData.lastName);
  
 
  


});
