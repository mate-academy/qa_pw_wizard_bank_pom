const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page; 
    this.currencyDropDown = page.getByTestId('currency');
    this.customerDropDown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  
    this.lastRow = page.getByRole('row').last();
    this.accountNumberCell = this.lastRow.getByRole('cell').nth(3);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async setCurrency(value) {
    await this.currencyDropDown.selectOption(value);
  }

  async assertCurrencyDropDownHasText(value) {
    await expect(this.currencyDropDown).toHaveValue(value);
  }

  async selectCustomer(value) {
    await this.customerDropDown.selectOption(value);
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