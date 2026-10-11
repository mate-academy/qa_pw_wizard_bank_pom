import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Reset clears transaction history', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();

  const amount = faker.number.int({
    min: 100,
    max: 999,
  }).toString();

  // Cria uma transação para garantir que existe algo no histórico
  await accountPage.clickDepositButton();
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickDepositFormButton();

  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();
  await transactionsPage.reload();

  await transactionsPage.assertFirstRowIsVisible();

  // Limpa o histórico
  await transactionsPage.clickResetButton();
  await transactionsPage.assertFirstRowIsHidden();

  // Confirma que continua vazio depois do refresh
  await transactionsPage.reload();
  await transactionsPage.assertFirstRowIsHidden();
});