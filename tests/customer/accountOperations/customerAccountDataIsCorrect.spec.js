
import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';

test('Assert Customer has correct bank data', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const loginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLogin();

  // Aguarda o carregamento das opções de clientes
  await page.locator('#userSelect option').nth(1).waitFor({
    state: 'attached'
  });

  // Seleciona Hermione Granger pelo valor interno da opção
  await loginPage.selectCustomer('1');
  await loginPage.clickLoginButton();

  // Validações dos dados da conta
  await accountPage.assertAccountLineContainsText('1001');
  await accountPage.assertAccountLineContainsText('5096');
  await accountPage.assertAccountLineContainsText('Dollar');
});















