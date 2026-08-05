import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

let customer;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  customer = {
   lastName: faker.person.firstName(),
   firstName: faker.person.lastName(),
   postCode: faker.location.zipCode(),
  };
 
  const addCustomerPage = new AddCustomerPage(page);
  
  await addCustomerPage.open();
  await addCustomerPage.registerCustomer(customer);
  await addCustomerPage.reload(); 
});

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  const openAccountPage = new OpenAccountPage(page);
  const customersPage = new CustomersListPage(page);

  await openAccountPage.openPage('openAccount');
  await openAccountPage.waitForOpened();
  
  await openAccountPage.selectCustomer(`${customer.firstName} ${customer.lastName}`)
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.addAccount();

  await openAccountPage.reload();

  await openAccountPage.openPage('customers');
  await customersPage.waitForOpened();

  await customersPage.assertCustomer({ ...customer, hasAccount: true });
});
