import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { BankManagerMainPage } from "../../../src/pages/manager/BankManagerMainPage";

test("Assert manager can add new customer", async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const managerMainPage = new BankManagerMainPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  page.on("dialog", (dialog) => dialog.accept());
  await addCustomerPage.fillForm(firstName, lastName, postCode);
  await addCustomerPage.submit();

  await page.reload();
  await managerMainPage.clickCustomersTab();

  const lastRow = page.locator("table tbody tr").last();

  await expect(lastRow.locator("td").nth(0)).toHaveText(firstName);
  await expect(lastRow.locator("td").nth(1)).toHaveText(lastName);
  await expect(lastRow.locator("td").nth(2)).toHaveText(postCode);
  await expect(lastRow.locator("td").nth(3)).toHaveText("");
});
