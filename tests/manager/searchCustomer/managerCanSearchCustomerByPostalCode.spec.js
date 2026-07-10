import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';


let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostalCodeField(postalCode);
  await addCustomerPage.clickAddCustomerButton();

  await addCustomerPage.reload();
});
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */


test('Assert manager can search customer by Postal Code', async ({ page }) => {

  const bankManagerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);
  
  await bankManagerMainPage.clickCustomersButton();
  await customersListPage.waitForOpened();
  await customersListPage.searchCustomer(postalCode);
  await customersListPage.assertCustomerRowPresent(firstName, lastName, postalCode);
  await customersListPage.assertOnlyOneRowPresent();
});

  /* 
  Test:
  1. Open Customers page.
  2. Fill the postalCode to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */

