import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { BankManagerMainPage } from "../../../src/pages/manager/BankManagerMainPage";

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const fullName = `${firstName} ${lastName}`;
const postCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  page.once("dialog", (dialog) => dialog.accept());
  await addCustomerPage.fillForm(firstName, lastName, postCode);
  await addCustomerPage.submit();
  await page.reload();
});

test("Assert manager can open account", async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const managerMainPage = new BankManagerMainPage(page);

  await openAccountPage.open();

  await openAccountPage.selectCustomer(fullName);
  await openAccountPage.selectCurrency("Dollar");

  page.on("dialog", (dialog) => dialog.accept());
  await openAccountPage.clickProcess();

  await page.reload();
  await managerMainPage.clickCustomersTab();

  const lastRow = page.locator("table tbody tr").last();
  const accountCell = lastRow.locator("td").nth(3);

  await expect(accountCell).not.toBeEmpty();
});
