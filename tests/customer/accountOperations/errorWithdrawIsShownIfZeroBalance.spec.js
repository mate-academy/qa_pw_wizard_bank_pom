import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CustomerLoginPage } from "../../../src/pages/customer/CustomerLoginPage";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage";

test("Assert the customer cannot withdraw money with empty balance", async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();

  await customerLoginPage.selectCustomer("Harry Potter");
  await customerLoginPage.clickLoginButton();

  await page.waitForURL("**/account");

  await accountPage.assertAccountLineContainsText("Balance : 0");

  await accountPage.clickWithdrawlButton();

  const amount = faker.number.int({ min: 1, max: 100 }).toString();
  await accountPage.fillAmountInputField(amount);

  await accountPage.clickWithdrawlFormButton();

  await accountPage.assertWithdrawNoBalanceErrorMessageIsVisible();
});
