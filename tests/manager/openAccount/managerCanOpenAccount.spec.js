import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.beforeEach(async ({ page }) => {
  
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage (page);
  await addCustomerPage.open();
  await addCustomerPage.customerForm('Harry', 'Potter', '666');
  await addCustomerPage.clickButtonAddC();
  await addCustomerPage.clickCustomerb();
  await addCustomerPage.reload();
  
  
  
  
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
});

test('Assert manager can add new customer', async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
      const customersListPage = new CustomersListPage (page);


  
  await addCustomerPage.clickOpenAccount();
  await addCustomerPage.name('2');
  await addCustomerPage.currency('Dollar');
  await addCustomerPage.clickProcess();
  await addCustomerPage.reload();
  await addCustomerPage.clickCustomerb();
  await customersListPage.assertAccountNotEmpty('Harry Potter')


  
  
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
});
