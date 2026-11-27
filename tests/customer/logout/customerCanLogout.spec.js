import { test, expect } from '@playwright/test';

import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';

test('Assert correct customer Logout', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);

  // Acessa a página inicial
  await bankHomePage.open();

  // Acessa o login do cliente
  await bankHomePage.clickCustomerLogin();

  // Aguarda o carregamento das opções de clientes
  await page.locator('#userSelect option').nth(1).waitFor({
    state: 'attached'
  });

  // Seleciona o cliente pelo valor interno da opção
  await customerLoginPage.selectCustomer('1');

  // Realiza o login
  await customerLoginPage.clickLoginButton();

  // Aguarda o botão Logout ficar visível
  const logoutButton = page.locator('button:has-text("Logout")');

  await logoutButton.waitFor({
    state: 'visible'
  });

  // Realiza o logout
  await logoutButton.click();

  // Valida se o dropdown de clientes está visível novamente
  await expect(page.locator('#userSelect')).toBeVisible();

  // Valida se nenhum cliente permanece selecionado
  await expect(page.locator('#userSelect')).toHaveValue('');
});

