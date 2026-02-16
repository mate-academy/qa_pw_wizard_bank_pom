import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator('#currency');
    this.currencyDropdownOptions = page.locator('#currency option');
    this.customerDropdown = page.locator('#userSelect');
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
  async assertCurrencyDropdownIsVisible() {
    await expect(this.currencyDropdown).toBeVisible();
  }
  async assertCurrencyDropdownHasOptions(options) {
    await expect(this.currencyDropdownOptions).toContainText(options);
  }
  async expandCurrencyDropdown() {
    await this.currencyDropdown.click();
  }
  async assertSelectedCurrency(currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }

  async selectCustomer(customer) {
    await this.customerDropdown.selectOption(customer);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
