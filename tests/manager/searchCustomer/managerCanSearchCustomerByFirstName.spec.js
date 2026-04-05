import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";

let firstName = faker.person.firstName();
let lastName = faker.person.lastName();
let postalCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  page.once("dialog", (d) => d.accept());
  await addCustomerPage.fillForm(firstName, lastName, postalCode);
  await addCustomerPage.submit();
});

test("Assert manager can search customer by First Name", async ({ page }) => {
  const customersPage = new CustomersListPage(page);
  await customersPage.open();

  await customersPage.search(firstName);

  await expect(customersPage.tableRows).toHaveCount(1);

  await expect(customersPage.tableRows.first().locator("td").nth(0)).toHaveText(
    firstName,
  );
});
