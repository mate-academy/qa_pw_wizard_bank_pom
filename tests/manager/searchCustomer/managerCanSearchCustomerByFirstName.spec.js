import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let user;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  const addCustomerPage = new AddCustomerPage(page);
    user = { 
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode()
   }
  
   await addCustomerPage.open();
   await addCustomerPage.firstNameHolderFill(user.firstName);
   await addCustomerPage.lastNameHolderFill(user.lastName);
   await addCustomerPage.postCodeHolderFill(user.postCode);
   await addCustomerPage.createCastomerButtonClick();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
 const castomersListPage = new CustomersListPage(page);

 await castomersListPage.open();
 await castomersListPage.searchCastomerByFirstName(user.firstName)
 await castomersListPage.cellIsPresent(user.firstName);
 await castomersListPage.assertHowManyRowIsPresent(1);
});
