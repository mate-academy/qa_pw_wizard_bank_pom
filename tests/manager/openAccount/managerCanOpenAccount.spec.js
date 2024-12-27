import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test.describe('Assert manager can open account', () => {


let customerName = {}; 

test.beforeEach( async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  const addCustomerPage = new AddCustomerPage(page); 
  await addCustomerPage.open();
  await addCustomerPage.waitForOpened();
  
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  let postCode = faker.location.zipCode();
  
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reload();
  customerName = { firstName, lastName};
  });


test('Assert manager can open dollar account', async ({ page }) => {
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
 1. Do not rely on the customer row id for the step 13. Use the ".last()" locator to get the last row.
*/
const bankManagerMainPage = new BankManagerMainPage(page); 
const openAccountPage = new OpenAccountPage(page); 
const customersListPage= new CustomersListPage (page);

await bankManagerMainPage.open();
await bankManagerMainPage.clickOpenAccountButton();
await openAccountPage.waitForOpened();
await openAccountPage.selectCustomer(customerName);
await openAccountPage.selectCurrency('Dollar');
await openAccountPage.clickProcessButton();
await openAccountPage.reload();
await bankManagerMainPage.open();
await bankManagerMainPage.clickCustomersButton();
await customersListPage.waitForOpened();
await customersListPage.assertLastRowAccountNumberContainsText('');

});

test('Assert manager can open pound account', async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page); 
const openAccountPage = new OpenAccountPage(page); 
const customersListPage= new CustomersListPage (page);

await bankManagerMainPage.open();
await bankManagerMainPage.clickOpenAccountButton();
await openAccountPage.waitForOpened();
await openAccountPage.selectCustomer(customerName);
await openAccountPage.selectCurrency('Pound');
await openAccountPage.clickProcessButton();
await openAccountPage.reload();
await bankManagerMainPage.open();
await bankManagerMainPage.clickCustomersButton();
await customersListPage.waitForOpened();
await customersListPage.assertLastRowAccountNumberContainsText('');

});

test('Assert manager can open rupee account', async ({ page }) => {
const bankManagerMainPage = new BankManagerMainPage(page); 
const openAccountPage = new OpenAccountPage(page); 
const customersListPage= new CustomersListPage (page);

await bankManagerMainPage.open();
await bankManagerMainPage.clickOpenAccountButton();
await openAccountPage.waitForOpened();
await openAccountPage.selectCustomer(customerName);
await openAccountPage.selectCurrency('Rupee');
await openAccountPage.clickProcessButton();
await openAccountPage.reload();
await bankManagerMainPage.open();
await bankManagerMainPage.clickCustomersButton();
await customersListPage.waitForOpened();
await customersListPage.assertLastRowAccountNumberContainsText('');

});
});
