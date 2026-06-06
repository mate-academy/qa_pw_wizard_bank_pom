import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";

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
  */
});

test("Assert manager can search customer by Last Name", async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.inputSearchCustomerField(`${lastName}`);
  await expect(page.locator("tbody")).toContainText(firstName);
  await expect(page.locator("tbody")).toContainText(lastName);
  await expect(page.locator("tbody")).toContainText(postCode);
  const rows = page.locator("tbody tr");
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    await expect(rows.nth(i).locator("td").nth(1)).toContainText(lastName);
  }
  // Last name is not unique, so more than one customer with the same last name can be displayed.//
  /* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
