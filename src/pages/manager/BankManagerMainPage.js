const { expect } = require('@playwright/test');

export class BankManagerMainPage {
  constructor(page) {
    this.page = page; 
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customerButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async pageWaitForLoad() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager');
  }

  async addCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async addOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }
  
  async customerButtonIsVisible() {
    await expect(this.customerButton).toBeVisible();
  }


}