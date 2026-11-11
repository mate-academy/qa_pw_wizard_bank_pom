import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
//import { SearchCustomers } from '../../../src/pages/manager/SearchCustomers';
//import { AccountCustomer } from '../../../src/pages/manager/AccountCustomer';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postalCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  const addCustPage = new AddCustomerPage(page);
  

    await addCustPage.open();
    await addCustPage.fillFirstNameField(firstName);
    await addCustPage.fillLastNameField(lastName);
    await addCustPage.fillPostCodeField(postalCode);
    await addCustPage.clickSubmitAddCustomerForm();
    await page.reload();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  const custList = new CustomersListPage(page);
  
    await custList.open();
    await custList.fillSearchCustomerName(firstName);
    await custList.assertLastCustomer(firstName, lastName, postalCode);
    await custList.assertNoRowsIsPresent();
});

/*test('Assert manager can search customer by First Name', async ({ page }) => {
  const searchCustomers = new SearchCustomers(page);
  const account = new AccountCustomer(page);
    await searchCustomers.open();
    await searchCustomers.selectFillName();
    await searchCustomers.clickLoginButton();
    await account.open();
  
  

   
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  
*/

/* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */