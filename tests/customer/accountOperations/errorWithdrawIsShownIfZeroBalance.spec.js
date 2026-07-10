import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test.describe('Negative customer balance', () => {
  let customerLoginPage;
  let customerAccountPage;
  const withdrawlAmount = faker.number.int(100).toString();

test.beforeEach(async ({ page }) => {
  customerLoginPage = new CustomerLoginPage(page);
  customerAccountPage = new CustomerAccountPage(page);
  await customerLoginPage.open();
});

test('Assert the customer cannot withdraw money with empty balance', async ({
  page,
}) => {
  // #region Assert the customer cannot withdraw money with empty balance
  /* 
  Test:
  1. Open Wizard bank login for Customer
  2. Select "Ron Weasly"
  3. Click [Login]
  4. Assert the "Balance : 0" text is present
  5. Click [Withdrawl]
  6. Type amount of money to withdraw
  7. Click [Withdraw]
  8. Assert error message is visible:
    'Transaction Failed. You can not withdraw amount more than the balance.'
  */
//  #endregion
await customerLoginPage.customerDropDown.selectOption({ label: 'Ron Weasly' });
await customerLoginPage.loginButton.click();

await expect(page.getByText('Balance : 0')).toBeVisible();
await customerAccountPage.withdrawlButton.click();

await customerAccountPage.amountField.fill(withdrawlAmount);
await customerAccountPage.withdrawlFormButton.click();
await expect(customerAccountPage.withdrawNoBalanceErrorMessage).toBeVisible();
});
});