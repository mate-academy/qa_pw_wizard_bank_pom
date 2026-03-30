import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page.getByTestId('currency');
    this.customerSelect = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency (currency) {
    await this.currencySelect.selectOption(currency);
  }

  async selectCustomer (firstName, lastName) {
    await this.customerSelect.selectOption(`${firstName} ${lastName}`);
  }

  async processButtonClick() {
    await this.processButton.click();
  }
}
