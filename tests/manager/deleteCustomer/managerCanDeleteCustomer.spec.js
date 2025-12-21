import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

   firstName = faker.person.firstName();
   lastName = faker.person.lastName();
   postCode = faker.location.zipCode();

  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  await addCustomerPage.open()
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reload();
});

test('Assert manager can delete customer', async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
  await bankManagerMainPage.clickCustomersButton();
  await customersListPage.clickDeleteInLastRow();
  await customersListPage.assertCustomerNotPresent(firstName);
  await customersListPage.reload();
  await customersListPage.assertCustomerNotPresent(firstName);
});
