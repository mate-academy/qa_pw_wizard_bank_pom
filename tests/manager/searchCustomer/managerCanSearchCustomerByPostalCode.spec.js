import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

let firstName;
let lastName;
let postCode; 

test.beforeEach( async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode(); 

const addCustomerPage = new AddCustomerPage(page); 
    await addCustomerPage.open();
    await addCustomerPage.waitForOpened();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.reload();

});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Fill the postalCode to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/
const bankManagerMainPage = new BankManagerMainPage(page); 
const openAccountPage = new OpenAccountPage(page); 
const customersListPage= new CustomersListPage (page);

await bankManagerMainPage.open();
await bankManagerMainPage.clickCustomersButton();
await customersListPage.waitForOpened();
await customersListPage.searchCustomerByPostCode(postCode);

});