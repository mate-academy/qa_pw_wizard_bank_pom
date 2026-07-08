import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert the customer cannot withdraw money with empty balance', async ({
  page,
}) => {
  /* 
  Test:
  1. Open Wizard bank login for Customer */

  const customerLoginPage = new CustomerLoginPage(page);
  await customerLoginPage.open();

  // 2. Select "Ron Weasly"

  await customerLoginPage.selectCustomer('Ron Weasly');

  // 3. Click [Login]

  await customerLoginPage.clickLoginButton();

  // 4. Assert the "Balance : 0" text is present

  const accountPage = new CustomerAccountPage(page);
  await accountPage.assertAccountLineContainsText('Balance : 0');

  // 5. Click [Withdrawl]

  await accountPage.clickWithdrawlButton();

  // 6. Type amount of money to withdraw

  const amount = faker.number.int(100).toString();
  await accountPage.fillAmountInputField(amount);

  // 7. Click [Withdraw]

  await accountPage.clickWithdrawlFormButton();

  // 8. Assert error message is visible:

  await accountPage.assertWithdrawNoBalanceErrorMessageIsVisible();

    // 'Transaction Failed. You can not withdraw amount more than the balance.'
  // */

});
