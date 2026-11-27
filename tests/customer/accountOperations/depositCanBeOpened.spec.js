
import { test } from '@playwright/test';

import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage.js';

test('Assert the deposit can be opened', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  const depositAmount = '100';

  await bankHomePage.open();
  await bankHomePage.clickCustomerLogin();

  // Aguarda o carregamento das opções de clientes
  await page.locator('#userSelect option').nth(1).waitFor({
    state: 'attached'
  });

  // Seleciona o cliente pelo valor interno da opção
  await customerLoginPage.selectCustomer('1');
  await customerLoginPage.clickLoginButton();

  // Executa o depósito na conta
  await accountPage.clickDepositButton();
  await accountPage.fillAmountInputField(depositAmount);
  await accountPage.clickDepositFormButton();

  // Valida a mensagem de sucesso
  await accountPage.assertDepositSuccessfulMessageIsVisible();

  // Navega até as transações
  await accountPage.clickTransactionsButton();

  // Aguarda a atualização da lista de transações
  await page.waitForTimeout(2000);

  // Valida o cabeçalho
  await transactionsPage.assertHeaderIsVisible();

  // Valida o valor e o tipo da transação
  await transactionsPage.assertLatestTransactionContainsAmountAndType(
    depositAmount,
    'Credit'
  );
});
