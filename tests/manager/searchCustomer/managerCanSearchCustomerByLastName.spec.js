import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";


let firstName = faker.person.firstName();
let lastName = faker.person.lastName();
let zipCode = faker.location.zipCode();


test.beforeEach(async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
    const addCustomerPage = new AddCustomerPage(page);
  
    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
  
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCodeFill(zipCode);
    await addCustomerPage.clickAddCustomerButton();
    await page.reload();
  
  
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
 
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
 const customersListPage = new CustomersListPage(page);
  const addCustomerPage = new AddCustomerPage(page);

await customersListPage.open();
await customersListPage.fillLastNameInSearchField(lastName)
await customersListPage.assertCustomerRowIsPresentInTable(lastName)
await customersListPage.assertNoOtherRowsArePresent()  





  /* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
