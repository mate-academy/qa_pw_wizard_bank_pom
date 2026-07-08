import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Assert the empty transactions list has correct values', async ({
  page,
}) => {
  /* 
  Test:
  1. Open Wizard bank login for Customer */

  const customerLoginPage = new CustomerLoginPage(page);
  await customerLoginPage.open();
 
  // 2. Select "Albus Dumbledore"

  await customerLoginPage.selectCustomer('Albus Dumbledore');

  // 3. Click [Login]

  await customerLoginPage.clickLoginButton();

  // 4. Click [Transactions]

  const accountPage = new CustomerAccountPage(page);
  await accountPage.clickTransactionsButton();

  // 5. Assert first column header conatins text "Date-Time"

  const transactionsPage = new TransactionsPage(page);
  await transactionsPage.assertHeaderFirstCellContainsText('Date-Time');

  // 6. Assert second column header conatins text "Amount"

  await transactionsPage.assertHeaderSecondCellContainsText('Amount');

  // 7. Assert first column header conatins text "Transaction Type"

  await transactionsPage.assertHeaderThirdCellContainsText('Transaction Type');

  // 8. Assert the first row in table is hidden

  await transactionsPage.assertFirstRowIsHidden();

  // */
});
