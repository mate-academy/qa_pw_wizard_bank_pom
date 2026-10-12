import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Assert the deposit updates balance and transaction history', async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();

  const initialBalance = await accountPage.getCurrentBalance();

  const amount = faker.number.int({
    min: 100,
    max: 999,
  }).toString();

  const expectedBalance = initialBalance + Number(amount);

  await accountPage.clickDepositButton();
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickDepositFormButton();

  await accountPage.assertDepositSuccessfulMessageIsVisible();

  await accountPage.assertAccountLineContainsText(
    `Balance : ${expectedBalance}`,
  );

  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();
  await transactionsPage.reload();

  await transactionsPage.assertTransactionIsPresent(amount, 'Credit');
});