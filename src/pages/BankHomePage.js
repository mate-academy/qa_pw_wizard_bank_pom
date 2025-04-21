const { expect } = require('@playwright/test');

export class BankHomePage {
  constructor(page) {
    this.page = page; 
    this.customerLoginButton = page.getByRole('button', { name: 'Customer Login' });
    this.bankManagerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }

  async clickBankManagerLoginButton() {
    await this.bankManagerLoginButton.click();
  }

  async assertAddCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async assertCustomersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }
}