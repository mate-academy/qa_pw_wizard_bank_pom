import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

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

let addCustomerPage = new AddCustomerPage (page);


await addCustomerPage.open();

 firstName = faker.person.firstName();
 lastName = faker.person.lastName();
 postCode = faker.location.zipCode(); 

await addCustomerPage.firstNameFieldFill(firstName);
await addCustomerPage.lastNameFieldFill(lastName);
await addCustomerPage.postCodeFieldFill(postCode);
await addCustomerPage.addCustomerButtonClick();
await addCustomerPage.reloadPage();

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
let openCustomerPage = new OpenAccountPage(page);
let customerListPage = new CustomersListPage(page);

  await openCustomerPage.open();
  await openCustomerPage.customerNameChoose(`${firstName} ${lastName}`);
  await openCustomerPage.currencyChoose('Dollar');
  await openCustomerPage.processButtonClick();
  await openCustomerPage.reloadPage();
  await openCustomerPage.customersButtonClick();
  await customerListPage.pageWaitForUrl();
  await customerListPage.assertLastCustomerInformation({
  firstName,
  lastName,
  postCode
});
  await customerListPage.assertAvaiableAccNumCustomerInformation();

    
});
