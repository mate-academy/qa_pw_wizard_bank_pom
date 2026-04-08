import { test } from "@playwright/test";
import { CustomerLoginPage } from "../../../src/pages/customer/CustomerLoginPage";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage";

test("Assert the customer can logout", async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer("Harry Potter");
  await customerLoginPage.clickLoginButton();
  await page.waitForURL("**/account");
  await accountPage.clickLogoutButton();
  await customerLoginPage.assertSelectCustomerDropdownIsVisible();
  await page.waitForURL("**/customer");
});
