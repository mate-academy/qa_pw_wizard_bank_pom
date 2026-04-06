import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CustomerLoginPage } from "../../../src/pages/customer/CustomerLoginPage";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage";
import { TransactionsPage } from "../../../src/pages/customer/TransactionsPage";

test("Assert reset button deletes transactons", async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank login for Customer
  2. Select "Harry Potter"
  3. Click [Login]
  4. Click [Deposit]
  5. Fill deposit value
  6. Click [Deposit]
  7. Assert Balance
  8. Click [Transactions]
  9. Assert Deposit transaction
  10. Click [Reset]
  11. Assert no transactions present
  */
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer("Harry Potter");
  await customerLoginPage.clickLoginButton();

  await accountPage.assertAccountLineContainsText("Balance : 0");
  await accountPage.clickDepositButton();
  const amount = faker.number.int({ min: 1, max: 100 }).toString();
  await accountPage.fillDepositAmountInputField(amount);
  await accountPage.clickDepositFormButton();
  await accountPage.assertAccountLineContainsText(`Balance : ${amount}`);

  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();
  await transactionsPage.reload();
  await transactionsPage.assertFirstRowAmountContainsText(amount);
  await transactionsPage.assertFirstRowTypeContainsText("Credit");
  
  await transactionsPage.clickResetButton();
  await transactionsPage.assertTransactionsNoLongerExists();

});
