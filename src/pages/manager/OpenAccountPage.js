const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerNameDropdown = page.getByTestId('userSelect'); 
    this.currencyDropdown = page.getByTestId('currency');     
    this.processButton = page.getByRole('button', { name: 'Process' }); 
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount');
}

async reload() {
  await this.page.reload();
}

async selectCustomer(customerName) {
    await this.customerNameDropdown.selectOption(customerName);
}

async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
}

async clickProcessButton() {
    await this.processButton.click();
}

async assertCustomerNameDropdownContainsValue(expectedValue) {
    const currentOptionText = await this.customerNameDropdown.inputValue();
    expect(currentOptionText).toBe(expectedValue);
}
async assertCurrencyDropdownContainsValue(expectedValue) {
    const currentOptionText = await this.currencyDropdown.inputValue();
    expect(currentOptionText).toBe(expectedValue);
}

async assertCustomerNameDropdownIsVisible() {
  await expect(this.customerNameDropdown).toBeVisible();
}

async assertCurrencyDropdownIsVisible() {
  await expect(this.currencyDropdown).toBeVisible();
}

}