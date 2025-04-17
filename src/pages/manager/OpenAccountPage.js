const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', { name: /Add Customer/i }).nth(0);
    this.openAccountButton = page.getByRole('button', { name: /Open Account/i }).nth(0);
    this.customersButton = page.getByRole('button', { name: /Customers/i }).nth(0);
    this.customerDropDown = page.getByTestId('userSelect');
    this.currencyDropDown = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: /Process/i });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async waitForOpen() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reload() {
    await this.page.reload();
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async selectCustomerOption(customer) {
    await this.customerDropDown.selectOption(customer);
  }

  async selectCurrencyOption(currency) {
    await this.currencyDropDown.selectOption(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertSelectedCurrencyOption(currency) {
    await expect(this.currencyDropDown.getByRole('option', { selected: true })).toHaveText(currency);
  }
}