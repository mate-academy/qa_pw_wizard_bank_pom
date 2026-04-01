import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.getByRole('combobox').first();
    this.currencySelect = page.getByRole('combobox').last();
    this.processButton = page.getByRole('button', {
      name: 'Process',
    });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  async selectCustomer(customer) {
    await this.customerSelect.selectOption(customer);
  }
  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }
  async clickProcessButton() {
    await this.processButton.click();
  }
  async assertCurrencySelectContainsOption(currency) {
    await expect(this.currencySelect).toHaveValue(currency);
  }
}
