import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer can withdraw money with sufficient balance', { tag: '@customer' }, async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const amount = '100';

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();
  await accountPage.assertAccountLineContainsText('Balance : 5096');
  await accountPage.clickWithdrawButton();
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickWithdrawFormButton();
  await accountPage.assertAccountLineContainsText('Balance : 4996');
});