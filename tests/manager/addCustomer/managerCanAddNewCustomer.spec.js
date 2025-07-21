import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Tips:
  1. Use faker for test data generation, example usage:
    const firstName = faker.person.firstName();
    const lastName = faker.person.LastName();
    const postCode = faker.location.zipCode(); 

  2. Do not rely on the customer row id for the steps 8-11. 
    Use the ".last()" locator to get the last row.
  */
  const addCustomerPage = new AddCustomerPage(page);
  const customerListPage = new CustomersListPage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);


  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode(); 

  // 1. Open add customer page by link
  // https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  await addCustomerPage.open();
  // 2. Fill the First Name.
  await addCustomerPage.fillFirstName(firstName);
  // 3. Fill the Last Name.
  await addCustomerPage.fillLastName(lastName);
  // 4. Fill the Postal Code.
  await addCustomerPage.fillPostalCode(postCode);
  // 5. Click [Add Customer].
  await addCustomerPage.clickAddCustomerButton();
  // 6. Reload the page (This is a simplified step to close the popup)
  await addCustomerPage.reload();
  // 7. Click [Customers] button.
  await bankManagerMainPage.clickCustomersButton();
  // 8. Assert the customer First Name is present in the table in the last row. 
  await customerListPage.assertCustomerFirstName(firstName);
  // 9. Assert the customer Last Name is present in the table in the last row. 
  await customerListPage.assertCustomerLastName(lastName);
  // 10. Assert the customer Postal Code is present in the table in the last row. 
  await customerListPage.assertCustomerPostCode(postCode);
  // 11. Assert there is no account number for the new customer in the last row. 
  await customerListPage.assertAccountNumberIsEmpty();

});
