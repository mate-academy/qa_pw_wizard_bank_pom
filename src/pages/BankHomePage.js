import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', {
      name: 'Customer Login',
    });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }

  async clickBankManagerLoginButton() {
    await this.page.getByRole('button', { name: 'Bank Manager Login' }).click();
  }

  async addCustomerButtonIsVisible() {
    await expect(this.page.getByRole('button', { name: 'Add Customer' })).toBeVisible();
  }

  async openAccountButtonIsVisible() {
    await expect(this.page.getByRole('button', { name: 'Open Account' })).toBeVisible();
  }

  async customersButtonIsVisible() {
    await expect(this.page.getByRole('button', { name: 'Customers' })).toBeVisible();
  }
}
