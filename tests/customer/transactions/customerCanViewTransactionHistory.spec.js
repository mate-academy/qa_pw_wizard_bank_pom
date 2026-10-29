import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Assert customer can view transaction history', async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank customer login
  2. Select "Harry Potter"
  3. Click [Login]
  4. Make a deposit
  5. Click [Transactions]
  6. Assert table header is visible
  7. Assert transaction amount and Credit type
  8. Click [Back] button
  9. Assert return to account page
  */
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();

  await accountPage.clickDepositButton();
  const amount = faker.number.int({ min: 10, max: 100 }).toString();
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();

  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();
  await transactionsPage.reload();
  await transactionsPage.assertFirstRowAmountContainsText(amount);
  await transactionsPage.assertFirstRowTypeContainsText('Credit');

  await transactionsPage.clickBackButton();
  await accountPage.assertLogoutButtonIsVisible();
});

