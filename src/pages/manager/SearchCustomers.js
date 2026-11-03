import { expect } from '@playwright/test';

export class SearchCustomers {
  constructor(page) {
    this.page = page;
    this.fieldName = page.locator('select#userSelect');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/customer',
    );
  }

  async selectFillName(){
    const options = this.fieldName.locator('option');
    
    // Aguarda o carregamento de pelo menos uma opção de cliente, além do placeholder.
    await expect(options.nth(1)).toBeAttached();

    // Localiza a última opção e obtém o valor usado pelo <select>.
    const lastOption = options.last();
    const lastValue = await lastOption.getAttribute('value');

      if (!lastValue) {
        throw new Error('A última opção da lista de clientes não possui um value válido.');
      }

      // Seleciona o cliente correspondente à última opção.
      await this.fieldName.selectOption({ value: lastValue });
  }

  async clickLoginButton(){
    const currentUrl = this.page.url();

    await Promise.all([
        this.loginButton.click(),
        this.page.waitForURL(url => url.href !== currentUrl),
    ]);
  }
}