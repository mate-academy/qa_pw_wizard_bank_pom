import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyList = page.locator('select#currency');
    this.customerList = page.locator('select#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectAndAssertCurrency(currency) {
    await this.currencyList.selectOption({ label: currency });
    await expect(this.currencyList.locator('option:checked')).toHaveText(currency);
  }

  async selectCustomer() {
    const options = this.customerList.locator('option');

      // Aguarda o carregamento de pelo menos uma opção de cliente, além do placeholder.
      await expect(options.nth(1)).toBeAttached();

    // Localiza a última opção e obtém o valor usado pelo <select>.
    const lastOption = options.last();
    const lastValue = await lastOption.getAttribute('value');

      if (!lastValue) {
        throw new Error('A última opção da lista de clientes não possui um value válido.');
      }

      // Seleciona o cliente correspondente à última opção.
      await this.customerList.selectOption({ value: lastValue });
  }

  async selectCurrency(){
    // 1. Conta quantas opções existem dentro do dropdown
    const options = this.currencyList.locator('option');
    const optionsCount = await options.count();

    // Sorteia entre as opções a partir do índice 1, ignorando o placeholder.
    const randomIndex = 1 + Math.floor(Math.random() * (optionsCount - 1));
      await this.currencyList.selectOption({ index: randomIndex });
  }

  async clickProcessButton(){
    await this.processButton.click();
  }
}
