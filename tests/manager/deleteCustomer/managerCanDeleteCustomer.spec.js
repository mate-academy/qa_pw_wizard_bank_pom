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
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test("Assert manager can delete customer", async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.inputSearchCustomerField(`${firstName}`);
  await expect(page.locator("tbody")).toContainText(firstName);
  await expect(page.locator("tbody")).toContainText(lastName);
  await expect(page.locator("tbody")).toContainText(postCode);
  const customerRow = page
    .locator("tbody tr")
    .filter({ hasText: `${firstName} ${lastName} ${postCode}` });
  await expect(customerRow).toBeVisible();
  await customerRow.getByRole("button", { name: "Delete" }).click();
  await expect(page.locator("tbody")).not.toContainText(firstName);
  await expect(page.locator("tbody")).not.toContainText(lastName);
  await expect(page.locator("tbody")).not.toContainText(postCode);
  await page.reload();
  await customersListPage.inputSearchCustomerField(`${firstName}`);
  await expect(page.locator("tbody")).not.toContainText(
    `${firstName} ${lastName} ${postCode}`,
  );
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
