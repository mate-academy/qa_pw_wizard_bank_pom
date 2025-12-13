import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup)
  7. Click [Customers] button.
  8. Assert the customer First Name is present in the table in the last row. 
  9. Assert the customer Last Name is present in the table in the last row. 
  10. Assert the customer Postal Code is present in the table in the last row. 
  11. Assert there is no account number for the new customer in the last row. 
  */

  const addCustomer = new AddCustomerPage(page);
  const customerList = new CustomersListPage(page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomer.open();
  await addCustomer.fillFistName(firstName);
  await addCustomer.fillLastName(lastName);
  await addCustomer.fillPostalCode(postCode);
  await addCustomer.clickAddCustomerButton();
  await addCustomer.reloadPage();
  await addCustomer.goToCustomerPage();
  await customerList.lastClientHaveFirstName(firstName);
  await customerList.lastClientHaveLastName(lastName);
  await customerList.lastClientHavePostCode(postCode);
  await customerList.checkAccountNumberEmpty();
});
