import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
let customersListPage;
let addCustomerPage;
let customerFirstName;
let customerLastName;
let postCode;
// let firstName;
// let lastName;
// let postalCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  // firstName = faker.person.firstName();
  // lastName = faker.person.lastName();
  // postalCode = faker.location.zipCode();
  addCustomerPage = new AddCustomerPage(page);
    await addCustomerPage.open();
    customerFirstName = faker.person.firstName(); 
    customerLastName = faker.person.lastName();
    postCode = faker.location.zipCode();
    await addCustomerPage.fillFirstNameField(customerFirstName);
    await addCustomerPage.fillLastNameField(customerLastName);
    await addCustomerPage.fillPostCodeField(postCode);
    await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Fill the postalCode to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
customersListPage = new CustomersListPage(page);
await addCustomerPage.clickCustomersButton();
await customersListPage.waitForLoading();
await customersListPage.fillSearchCustomerField(postCode);
await customersListPage.checkCustomerData(postCode);
await customersListPage.checkCustomerRowPresent();
});
