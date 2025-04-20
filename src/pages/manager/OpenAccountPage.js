const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page.locator('#currency');
    this.userSelect = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reload() {
    await this.page.reload();
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async assertCurrencyValueToBe(currency) {
    await expect(this.currencySelect).toHaveValue(currency);
  }

  async selectUserByLabel(label) {
    await this.userSelect.selectOption({ label });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
  
  async clickCustomersButton() {
    await this.customersButton.click();
  }
}