import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

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

    const addCustomerPage = new AddCustomerPage(page);
    
    await addCustomerPage.open();
    
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postCode = faker.location.zipCode(); 
      
    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillLastNameField(lastName);
    await addCustomerPage.fillPostCodeField(postCode);
    await addCustomerPage.clickAddCustomerButtonForm();

});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Fill the postalCode to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/
  const customersListPage = new CustomersListPage(page);
    
  await customersListPage.open();
  await customersListPage.fillSearchField(`${postCode}`);
  await customersListPage.tableRowHasText(`${postCode}`);
  await customersListPage.assertOnlyOneCustomerRow();

});