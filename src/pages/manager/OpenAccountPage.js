const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page; 
    this.currencyDropdown = page.getByTestId('currency');
    this.customerDropdown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    
    this.customersTab = page.getByRole('button', { name: 'Customers' });
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reload () {
    await this.page.reload();
  }

  async waitingForURL () {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCurrency (currencyName) {
    await this.currencyDropdown.selectOption({ label: currencyName });
  }

  async selectCustomer(firstName, lastName) {
    const customerFullName = `${firstName} ${lastName}`; 
    await this.customerDropdown.selectOption({ label: customerFullName });
  }

  async assertCurrency (currencyName) {
    const selectedOption = await this.currencyDropdown.inputValue();
    await expect (selectedOption).toBe(currencyName);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersTab() {
    await this.customersTab.click();
  }

}