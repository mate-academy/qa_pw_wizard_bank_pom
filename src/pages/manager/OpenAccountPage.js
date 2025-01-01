const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.getByTestId('currency');
    this.customerNameDropDown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async assertSelectCurrencyDropdownIsVisible() {
    await expect(this.currencyDropDown).toBeVisible();
  }

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption(currency);
  }

  async assertSelectCurrencyDropdownContainsValue(value) {
    const currentOptionText = await this.currencyDropDown.inputValue();
    expect(currentOptionText).toBe(value);
  }

  async selectCustomerName(customerName) {
    await this.customerNameDropDown.selectOption(customerName);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
   
}