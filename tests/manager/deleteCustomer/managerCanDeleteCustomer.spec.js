import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
 
const customer = {
  firstName: '',
  lastName: '',
  postCode: ''
}

test.beforeEach( async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  customer.firstName = faker.person.firstName();
  customer.lastName = faker.person.lastName();
  customer.postCode = faker.location.zipCode();

  addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(customer.firstName);
  await addCustomerPage.fillLastNameField(customer.lastName);
  await addCustomerPage.fillPostCode(customer.postCode);
  await addCustomerPage.clickAddCustomerButton();


});

test('Assert manager can delete customer', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Click [Delete] for the row with customer name.
3. Assert customer row is not present in the table. 
4. Reload the page.
5. Assert customer row is not present in the table. 
*/
  addCustomerPage.clickCustomersTab();
  const customerListPage = new CustomersListPage(page);

  await customerListPage.waitForLoading();
  await customerListPage.assertCustomerRowVisibility(customer.firstName, customer.lastName, customer.postCode, true)

  await customerListPage.deleteCustomer(customer.firstName, customer.lastName, customer.postCode);
  await customerListPage.assertCustomerRowVisibility(customer.firstName, customer.lastName, customer.postCode, false)

  await customerListPage.reload();
  await customerListPage.assertCustomerRowVisibility(customer.firstName, customer.lastName, customer.postCode, false)


});