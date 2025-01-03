const { expect } = require('@playwright/test');

export class BankManagerMainPage {
  constructor(page) {
    this.page = page; 
    this.addCustomerButtonTab = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButtonTab = page.getByRole('button', { name: 'Open Account' });
    this.customersButtonTab = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async clickAddCustomerButtonTab() {
    await this.addCustomerButtonTab.click();
  }

  async addCustomerButtonTabVisible() {
    await expect(this.addCustomerButtonTab).toBeVisible();
  }

  async clickCustomersButtonTab() {
    await this.customersButtonTab.click();
  }

  async clickopenAccountButtonTab() {
    await this.openAccountButtonTab.click();
  }

  async openAccountButtonTabVisible() {
    await expect(this.openAccountButtonTab).toBeVisible();
  }

  async customersButtonTabVisible() {
    await expect(this.customersButtonTab).toBeVisible();
  }
}