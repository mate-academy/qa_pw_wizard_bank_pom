import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Valid withdraw updates balance and transaction history', async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();

  const initialBalance = await accountPage.getCurrentBalance();

  const amount = faker.number.int({
    min: 1,
    max: initialBalance,
  }).toString();

  const expectedBalance = initialBalance - Number(amount);

  
  await accountPage.clickWithdrawlButton();
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickWithdrawlFormButton();

  await accountPage.assertAccountLineContainsText(
    `Balance : ${expectedBalance}`,
  );

  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();
  await transactionsPage.reload();

  await transactionsPage.assertTransactionIsPresent(amount, 'Debit');
  
});