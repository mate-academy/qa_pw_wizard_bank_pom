import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelector = page.getByTestId('currency');
    this.customerSelector = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async selectCustomerName(firstName,lastName) {
    await this.customerSelector.selectOption(firstName +' '+ lastName);
  }

  async selectCurrency(currencyName) {
    await this.currencySelector.selectOption(currencyName)
  }

  async assertSelectedCurrency(currencyName) {
    await expect(this.currencySelector).toHaveValue(currencyName);
  }
}
