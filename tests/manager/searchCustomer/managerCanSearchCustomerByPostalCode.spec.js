import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

const customer = {
  firstName: '',
  lastName: '',
  postCode: '',
}

let addCustomerPage;

test.beforeEach( async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  addCustomerPage = new AddCustomerPage(page);

  customer.firstName = faker.person.firstName();
  customer.lastName = faker.person.lastName();
  customer.postCode = faker.location.zipCode(); 

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(customer.firstName);
  await addCustomerPage.fillLastNameField(customer.lastName);
  await addCustomerPage.fillPostCode(customer.postCode);
  await addCustomerPage.clickAddCustomerButton();

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

  await addCustomerPage.clickCustomersTab();
  await customersListPage.waitForLoading();

  await customersListPage.searchForCustomer(customer.postCode);
  await customersListPage.assertCustomerRowVisibility(customer.firstName, customer.lastName, customer.postCode, true);
  await customersListPage.assertCustomerRowCount(2); // 1-header row with text

});