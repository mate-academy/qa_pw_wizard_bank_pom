import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";

let user;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode(),
  };
  console.log("Created user:", user);
  await addCustomerPage.addCustomer(
    user.firstName,
    user.lastName,
    user.postCode,
  );
  await page.reload();
});

test("Assert manager can add new customer", async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);
  await openAccountPage.clickOpenAccount();
  await openAccountPage.waitForLoading();
  await openAccountPage.selectCustomer(user);
  await openAccountPage.selectCurrency("Dollar");
  await openAccountPage.clickProcess();
  await page.reload();
  await openAccountPage.goCustomersTab();
  await customersListPage.waitForLoading();
  await customersListPage.assertCellNotEmpty(user, 3); // Assert account number cell is not empty
  });
