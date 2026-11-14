import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";

let firstName = faker.person.firstName();
let lastName = faker.person.lastName();
let zipCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);

  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostalCode(zipCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();

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

test("Assert manager can add new customer", async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  await addCustomerPage.clickOpenAccountButton();
  await openAccountPage.selectCustomerName(firstName, lastName);
  await openAccountPage.selectDollar();
  await openAccountPage.clickProcessButton();
  await page.reload();
  await addCustomerPage.clickCustomerButton();
  await customersListPage.assertAccountNumberIsNotEmpty(firstName, lastName);

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
