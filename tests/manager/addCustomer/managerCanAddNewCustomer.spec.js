import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";

test("Assert manager can add new customer", async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  // Step 1: Open add customer page
  await addCustomerPage.open();
  const user = {
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
  await addCustomerPage.goCustomersTab();
  await customersListPage.waitForLoading();
  await page.reload();

  await customersListPage.assertCustomerAdded(
    user.firstName,
    user.lastName,
    user.postCode,
  );

  await customersListPage.assertCellIsEmpty(user, 3); // Assert account number cell is empty
});
