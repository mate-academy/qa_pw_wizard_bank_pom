import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";

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
<<<<<<< HEAD
  const addCustomer = new AddCustomerPage(page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomer.open();
  await addCustomer.customerName(firstName);
  await addCustomer.customerLastname(lastName);
  await addCustomer.customerPostal(postCode);
  await addCustomer.customerAdd();
  await page.reload();
});

test("Assert manager can open account for custome", async ({ page }) => {
=======
});

test('Assert manager can add new customer', async ({ page }) => {
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
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
<<<<<<< HEAD
  const addCustomer = new AddCustomerPage(page);
  await addCustomer.openAccount();

  const openAccount = new OpenAccountPage(page);
  await openAccount.open();

  await openAccount.chooseCurrentAccount();
=======
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
});
