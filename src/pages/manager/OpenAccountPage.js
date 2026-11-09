import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.getByTestId('currency');
    this.customerDropdown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
  }

  async assertSelectedCurrencyDisplay(currency) {
    await expect(this.currencyDropdown.locator('option:checked')).toHaveText(currency);
  }

  async waitForOpenAccountUrl() {
    await this.page.waitForURL('**/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCustomer(user) {
    await this.customerDropdown.selectOption(user);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async reload() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
