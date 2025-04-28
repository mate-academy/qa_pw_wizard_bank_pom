const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page; 
    this.customerSelectList = page.getByTestId('userSelect');
    this.currencySelectList = page.getByTestId('currency');
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async waitForPageLoad() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount')
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async selectItemInCustomerSelectList(itemfirstName, itemLastName) {
    await this.customerSelectList.selectOption(`${itemfirstName} ${itemLastName}`);
  }

  async selectItemInCurrencySelectList(itemName) {
    await this.currencySelectList.selectOption(itemName);
  }

  async assertCurrencyListInputValue(expectedValue) {
    const currencyInputValue = await this.currencySelectList.inputValue();
    await expect(currencyInputValue).toBe(expectedValue);
  }
}