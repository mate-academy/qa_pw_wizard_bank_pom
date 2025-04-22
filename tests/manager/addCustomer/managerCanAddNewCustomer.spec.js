import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

const user = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postCode: faker.location.zipCode(),
};

test('Assert manager can add new customer', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(user.firstName);
  await addCustomerPage.fillLastName(user.lastName);
  await addCustomerPage.fillPostCodeField(user.postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reloadPage();
  await addCustomerPage.clickCustomersButton();
  await customersListPage.waitForTableLoad();


  await customersListPage.assertFirstNameInLastCell(user.firstName);
  await customersListPage.assertLastNameInLastCell(user.lastName);
  await customersListPage.assertAccountNumberCellIsEmpty();

/* 
Test:
1. Open add customer page by link https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
2. Fill the First Name.  
3. Fill the Last Name.
4. Fill the Postal Code.
5. Click [Add Customer].
6. Reload the page (This is a simplified step to close the popup)
7. Click [Customers] button.
8. Assert the First Name of the customer is present in the table in the last row. 
9. Assert the Last Name of the customer is present in the table in the last row. 
10. Assert the Postal Code of the customer is present in the table in the last row. 
11. Assert there is no account number for the new customer in the table in the last row. 

Tips:
1. Use faker for test data generation, example:
usage:
 const firstName = faker.person.firstName();
 const lastName = faker.person.LastName();
 const postCode = faker.location.zipCode(); 

 2. Do not rely on the customer row id for the steps 8-11. Use the ".last()" locator to get the last row.
*/
});
