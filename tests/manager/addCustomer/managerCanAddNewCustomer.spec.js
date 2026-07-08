import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust */

  const customerPage = new AddCustomerPage(page);
  await customerPage.open();

  // 2. Fill the First Name.  

  const firstName = faker.person.firstName();
  await customerPage.fillFirstName(firstName);

  // 3. Fill the Last Name.

  const lastName = faker.person.lastName();
  await customerPage.fillLastName(lastName);

  // 4. Fill the Postal Code.

  const postalCode = faker.location.zipCode();
  await customerPage.fillPostCode(postalCode);

  // 5. Click [Add Customer].

  await customerPage.clickAddCustomer();

  // 6. Reload the page (This is a simplified step to close the popup)
  
  const managerMainPage = new BankManagerMainPage(page);
  await managerMainPage.reload();

  // 7. Click [Customers] button.

  await managerMainPage.clickCustomersButton();

  // 8. Assert the customer First Name is present in the table in the last row. 
  
  const customersListPage = new CustomersListPage(page);
  await customersListPage.assertLastRowFirstName(firstName);

  // 9. Assert the customer Last Name is present in the table in the last row. 

  await customersListPage.assertLastRowLastName(lastName);

  // 10. Assert the customer Postal Code is present in the table in the last row. 

  await customersListPage.assertLastRowPostCode(postalCode);

  // 11. Assert there is no account number for the new customer in the last row. 

  await customersListPage.assertLastRowHasNoAccountNumber();

  // Tips:
  // 1. Use faker for test data generation, example usage:
    // const firstName = faker.person.firstName();
    // const lastName = faker.person.lastName();
    // const postCode = faker.location.zipCode();

  // 2. Do not rely on the customer row id for the steps 8-11. 
    // Use the ".last()" locator to get the last row.
  // */
});
