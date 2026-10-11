import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Customer cannot withdraw more than available balance', async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();

  const initialBalance = await accountPage.getCurrentBalance();

  const withdrawAmount = (initialBalance + 1).toString();

  await accountPage.clickWithdrawlButton();
  await accountPage.fillAmountInputField(withdrawAmount);
  await accountPage.clickWithdrawlFormButton();

  await accountPage.assertWithdrawNoBalanceErrorMessageIsVisible();

  await accountPage.assertAccountLineContainsText(
    `Balance : ${initialBalance}`,
  );
});