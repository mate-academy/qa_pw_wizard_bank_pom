const { expect } = require('@playwright/test');

export class BankManagerMainPage {
  constructor(page) {
    this.page = page; 
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async checkAdCustomerButtonVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async checkOpenAccountButtonVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async openAccountButtonClick() {
    await this.openAccountButton.click();
  }

  async checkCustomersButtonVisible() {
    await expect(this.customersButton).toBeVisible();
  }
  
  async customersButtonClick() {
    await this.customersButton.click();
  }
}