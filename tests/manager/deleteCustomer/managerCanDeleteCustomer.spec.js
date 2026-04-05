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
  page.once("dialog", (dialog) => dialog.accept());
  await addCustomerPage.fillForm(firstName, lastName, postCode);
  await addCustomerPage.submit();
});

test("Assert manager can delete customer", async ({ page }) => {
  const customersPage = new CustomersListPage(page);
  await customersPage.open();
  await customersPage.search(firstName);
  await customersPage.deleteFirstCustomer();
  await customersPage.search(firstName);
  await expect(customersPage.tableRows).toHaveCount(0);
});
