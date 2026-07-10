import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test.describe('Customer account operations', () => {
  let customerLoginPage;
  let customerAccountPage;
  let transactionsPage;
  const depositAmount = faker.number.int(100).toString();
  const currentBalance = `Balance : ${depositAmount}`;

  test.beforeEach(async ({ page }) => {
    customerLoginPage = new CustomerLoginPage(page);
    customerAccountPage = new CustomerAccountPage(page);
    transactionsPage = new TransactionsPage(page);
    await customerLoginPage.open();
  });

test('Assert the deposit can be opened', async ({ page }) => {
  // #region Assert the deposit can be opened
  /* 
  Test:
  1. Open Wizard bank login for Customer
  2. Select "Harry Potter"
  3. Click [Login]
  4. Click [Deposit]
  5. Fill deposit value
  6. Click [Deposit]
  7. Assert 'Deposit Successful' message is visible
  8. Assert Balance
  9. Click [Transactions]
  10. Assert Deposit transaction
  */
//  #endregion
 await customerLoginPage.customerDropDown.selectOption({ label: 'Harry Potter' });
 await customerLoginPage.loginButton.click();
 await customerAccountPage.depositButton.click();

 await customerAccountPage.amountField.fill(depositAmount);
 await customerAccountPage.depositFormButton.click();

 await expect(customerAccountPage.depositSuccessfulMessage).toBeVisible();
 await expect(page.getByText(`${currentBalance}`)).toBeVisible();
 await customerAccountPage.transactionsButton.click();
 await page.waitForTimeout(1000);
 await page.reload();
 await expect(transactionsPage.firstRowAmountCell).toHaveText(`${depositAmount}`);
});
});