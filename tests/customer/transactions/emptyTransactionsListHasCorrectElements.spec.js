import { test } from "@playwright/test";
// ПЕРЕВІР: Фігурні дужки { } мають бути навколо TransactionsPage
import { CustomerLoginPage } from "../../../src/pages/customer/CustomerLoginPage";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage";
import { TransactionsPage } from "../../../src/pages/customer/TransactionsPage";

test("Assert the empty transactions list has correct values", async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer("Albus Dumbledore");
  await customerLoginPage.clickLoginButton();

  await page.waitForURL("**/account");

  await accountPage.clickTransactionsButton();

  await page.waitForURL("**/listTx");
  await page.waitForLoadState("networkidle");

  await transactionsPage.assertHeaderIsVisible(); // Додав це для надійності
  await transactionsPage.assertHeaderFirstCellContainsText("Date-Time");
  await transactionsPage.assertHeaderSecondCellContainsText("Amount");
  await transactionsPage.assertHeaderThirdCellContainsText("Transaction Type");

  await transactionsPage.assertFirstRowIsHidden();
});
