import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

let customer;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  customer = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode(),
  }

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(customer.firstName);
  await addCustomerPage.fillLastNameField(customer.lastName);
  await addCustomerPage.fillPostCodeField(customer.postCode);
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

  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.fillSearchField(customer.postCode);
  await customersListPage.assertCustomerIsPresentInTable(customer);
  await customersListPage.assertOnlyOneRowIsDisplayed();
});
