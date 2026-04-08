import { test, expect } from "@playwright/test";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";

test("Assert manager can choose currencies for account", async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  await openAccountPage.open();

  const currencies = ["Dollar", "Pound", "Rupee"];

  for (const currency of currencies) {
    await openAccountPage.selectCurrency(currency);

    await expect(openAccountPage.currencySelect).toHaveValue(currency);
  }
});
