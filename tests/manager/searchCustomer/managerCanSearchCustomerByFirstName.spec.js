import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankHomePage } from '../../../src/pages//BankHomePage';

let firstName;
let lastName;
let postCode;
let fullName;

test.beforeEach(async ({ page }) => {

    const customerPage = new AddCustomerPage (page);
    const managerMainPage = new BankManagerMainPage (page);
    const listPage = new CustomersListPage (page);
    const accountPage = new OpenAccountPage (page);
    const homePage = new BankHomePage (page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();  
  fullName = `${firstName} ${lastName} ${postCode}`;

  await customerPage.open();
  await customerPage.firstNameFieldFill(firstName);
  await customerPage.lastNameFieldFill(lastName);
  await customerPage.postCodeFieldFill(postCode);
  await customerPage.AddCustomerButtonClick();
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

});

test('Assert manager can search customer by First Name', async ({ page }) => {
    const customerPage = new AddCustomerPage (page);
    const managerMainPage = new BankManagerMainPage (page);
    const listPage = new CustomersListPage (page);
    const accountPage = new OpenAccountPage (page);
    const homePage = new BankHomePage (page);

  await listPage.open();
  await listPage.searchFieldFill(firstName);
  
  await listPage.userTableContain(fullName);
  await listPage.userTableHasOnlyOneRow();



  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
