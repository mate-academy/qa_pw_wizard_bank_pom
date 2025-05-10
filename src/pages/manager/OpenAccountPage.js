const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page; 
    this.currencyDropdownLocator = page.getByTestId('currency');
    this.customerDropdownLocator = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reload() {
    await this.page.reload();
  }

  async selectCurrencyFromDropdown(currency) {
    await this.currencyDropdownLocator.selectOption(currency);
  }

  async selectCustomerFromDropdown(customer) {
    await this.customerDropdownLocator.selectOption(customer);
  }

  async assertDropdownHasValue(value) {
    const selectedValue = await this.currencyDropdownLocator.inputValue();

    await expect(selectedValue).toBe(value);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
