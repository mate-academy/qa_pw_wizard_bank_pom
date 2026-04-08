import { test, expect } from "@playwright/test";
import { BankHomePage } from "../../../src/pages/BankHomePage";
import { BankManagerMainPage } from "../../../src/pages/manager/BankManagerMainPage";

test("Assert manager can Login", async ({ page }) => {
  const homePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);

  await homePage.open();
  await homePage.clickBankManagerLogin();

  await expect(managerMainPage.addCustomerBtn).toBeVisible();
  await expect(managerMainPage.openAccountBtn).toBeVisible();
  await expect(managerMainPage.customersBtn).toBeVisible();
});
