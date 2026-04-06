import { test } from "@playwright/test";
import { CustomerLoginPage } from "../../../src/pages/customer/CustomerLoginPage";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage";
import { TransactionsPage } from "../../../src/pages/customer/TransactionsPage";
import { faker } from "@faker-js/faker";

test("Assert withdrawal works correct", async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank login for Customer
  2. Select "Ron Weasly"
  3. Click [Login]
  4. Click [Deposit]
  5. Fill deposit value
  6. Click [Deposit]
  7. Assert Balance
  8. Click [Withdrawl]
  9. Fill withraw value
  10. Click [Withdraw]
  11. Assert 'Transaction successful' message is visible
  12. Assert Balance
  13. Click [Transactions]
  14. Assert Withdrawal transaction
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

  await accountPage.clickWithdrawlButton();
  await accountPage.fillWithdrawlAmountInputField(amount);
  await accountPage.clickWithdrawlFormButton();
  await accountPage.assertWithdrawSuccessMessageIsVisible();
  await accountPage.assertAccountLineContainsText("Balance : 0");

  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();
  await transactionsPage.reload();
  await transactionsPage.assertSecondRowAmountContainsText(amount);
  await transactionsPage.assertSecondRowTypeContainsText("Debit");
});
