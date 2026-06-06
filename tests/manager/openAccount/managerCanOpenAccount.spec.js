import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";
let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  await addCustomerPage.open();
  await addCustomerPage.inputFirstNameField(firstName);
  await addCustomerPage.inputLastNameField(lastName);
  await addCustomerPage.inputPostCodeField(postCode);
  await addCustomerPage.clickAddCustomerSubmitButton();
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

test("Assert manager can open account for new customer", async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  await openAccountPage.open();
  await openAccountPage.clickOpenAccountButton();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency("Dollar");
  await openAccountPage.clickProcess();
  await page.reload();
  await openAccountPage.clickCustomersButton();
  const lastRow = page.locator("tbody tr").last();
  await expect(lastRow.locator("td").nth(0)).toContainText(firstName);
  await expect(lastRow.locator("td").nth(1)).toContainText(lastName);
  await expect(lastRow.locator("td").nth(2)).toContainText(postCode);
  await expect(lastRow.locator("td").nth(3)).not.toHaveText("");

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
