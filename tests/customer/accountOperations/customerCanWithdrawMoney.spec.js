import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer can withdraw money', async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank login for Customer
  2. Select "Harry Potter"
  3. Click [Login]
  4. Click [Deposit]
  5. Fill deposit value
  6. Click [Deposit]
  7. Assert Balance equals the deposit value
  8. Click [Withdrawl]
  9. Assert the withdraw form is visible
  10. Fill withdraw value less than the balance
  11. Click [Withdraw]
  12. Assert 'Transaction successful' message is visible
  13. Assert Balance decreased by the withdraw value
  */
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  const depositAmount = faker.number.int({ min: 100, max: 1000 });
  const withdrawAmount = faker.number.int({ min: 1, max: depositAmount });

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();
  await accountPage.clickDepositButton();
  await accountPage.fillAmountInputField(depositAmount.toString());
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();
  await accountPage.assertAccountLineContainsText(`Balance : ${depositAmount}`);
  await accountPage.clickWithdrawlButton();
  await accountPage.assertWithdrawFormIsVisible();
  await accountPage.fillAmountInputField(withdrawAmount.toString());
  await accountPage.clickWithdrawlFormButton();
  await accountPage.assertWithdrawSuccessfulMessageIsVisible();
  await accountPage.assertAccountLineContainsText(
    `Balance : ${depositAmount - withdrawAmount}`,
  );
});
