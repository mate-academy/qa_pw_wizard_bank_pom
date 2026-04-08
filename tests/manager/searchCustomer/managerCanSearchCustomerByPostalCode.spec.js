import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();

  page.once("dialog", (d) => d.accept());

  await addCustomerPage.fillForm(firstName, lastName, postCode);
  await addCustomerPage.submit();
});

test("Assert manager can search customer by Postal Code", async ({ page }) => {
  const customersPage = new CustomersListPage(page);

  await customersPage.open();

  await customersPage.search(postCode);

  await expect(customersPage.tableRows).toHaveCount(1);
  await expect(customersPage.tableRows.first().locator("td").nth(2)).toHaveText(
    postCode,
  );
});
