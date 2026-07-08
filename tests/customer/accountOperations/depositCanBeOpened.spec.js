import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Assert the deposit can be opened', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank login for Customer */ 

const customerLoginPage = new CustomerLoginPage(page); 
await customerLoginPage.open();

  // 2. Select "Harry Potter"

await customerLoginPage.selectCustomer('Harry Potter');

  // 3. Click [Login]

  await customerLoginPage.clickLoginButton();

  // 4. Click [Deposit]

  const accountPage = new CustomerAccountPage(page);
  await accountPage.clickDepositButton();

  // 5. Fill deposit value

  const initialBalance = await accountPage.getBalanceValue(); // initial deposit value
  const amount = faker.number.int(100);
  await accountPage.fillAmountInputField(amount);

  // 6. Click [Deposit]

  await accountPage.clickDepositFormButton();

  // 7. Assert 'Deposit Successful' message is visible

  await accountPage.assertDepositSuccessfulMessageIsVisible();
  
  // 8. Assert Balance

  await accountPage.assertBalanceAfterDeposit(initialBalance, amount);

  // 9. Click [Transactions]

  await accountPage.clickTransactionsButton();
    
  // 10. Assert Deposit transaction

  const transactionsPage = new TransactionsPage(page);
  await transactionsPage.assertHeaderIsVisible();
  await transactionsPage.reload();
  await transactionsPage.assertFirstRowAmountContainsText(amount);
  await transactionsPage.assertFirstRowTypeContainsText('Credit');
  // */
});
