import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';




test('Assert manager can add new customer', async ({ page }) => {
  
  const customerPage = new AddCustomerPage (page);
  const managerMainPage = new BankManagerMainPage (page);
  const listPage = new CustomersListPage (page);
  const accountPage = new OpenAccountPage (page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

await customerPage.open();


await customerPage.firstNameFieldFill(firstName);
await customerPage.lastNameFieldFill(lastName);
await customerPage.postCodeFieldFill(postCode);
await customerPage.AddCustomerButtonClick();
await page.reload();
await customerPage.customerButtonClick();
await listPage.waitForOpened();

await listPage.customerTableLastContain(firstName);
await listPage.customerTableLastContain(lastName);
await listPage.customerTableLastContain(postCode);

const fullName = `${firstName} ${lastName} ${postCode}`;
const accountNumberLast = page.getByRole('row', { name: fullName }).last().getByRole('cell').nth(3);


await expect(accountNumberLast).toBeEmpty();




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

  Tips:
  1. Use faker for test data generation, example usage:
    const firstName = faker.person.firstName();
    const lastName = faker.person.LastName();
    const postCode = faker.location.zipCode(); 

  2. Do not rely on the customer row id for the steps 8-11. 
    Use the ".last()" locator to get the last row.
  */
 

});
