import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test.describe('Transactions', () => {
  let customerLoginPage;
  let customerAccountPage;
  let transactionsPage;

test.beforeEach(async ({ page }) => {
  customerLoginPage = new CustomerLoginPage(page);
  customerAccountPage = new CustomerAccountPage(page);
  transactionsPage  = new TransactionsPage(page);
  await customerLoginPage.open();
});

test('Assert the empty transactions list has correct values', async ({ page }) => {
  // #region Assert the empty transactions list has correct values
  /* 
  Test:
  1. Open Wizard bank login for Customer 
  2. Select "Albus Dumbledore"
  3. Click [Login]
  4. Click [Transactions]
  5. Assert first column header conatins text "Date-Time"
  6. Assert second column header conatins text "Amount"
  7. Assert first column header conatins text "Transaction Type"
  8. Assert the first row in table is hidden
  */
//  #endregion
 await customerLoginPage.customerDropDown.selectOption({ label: 'Albus Dumbledore' });
 await customerLoginPage.loginButton.click();
 await customerAccountPage.transactionsButton.click();
 
 await expect(transactionsPage.headerDateTime).toHaveText('Date-Time');
 await expect(transactionsPage.headerAmount).toHaveText('Amount');
 await expect(transactionsPage.headerTransactionType).toHaveText('Transaction Type');
 await expect(transactionsPage.firstRow).toBeHidden();
});
});