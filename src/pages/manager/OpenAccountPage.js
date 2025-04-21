const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page; 
    this.currencySelector = page.locator('select#currency');
    this.customerSelector = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCurrency(currency) {
    await this.currencySelector.selectOption({ value: currency });
  }

  async assertSelectedCurrency(currency) {
    const selectedValue = await this.currencySelector.inputValue();
    await expect(selectedValue).toBe(currency);
  }
  
  async selectCustomerName(firstName, lastName) {
    await this.customerSelector.selectOption(`${firstName} ${lastName}`);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  
}