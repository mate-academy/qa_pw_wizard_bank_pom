import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', {
      name: 'Customer Login',
    });
    this.bankManagerLoginButton = page.getByRole('button', {
      name: 'Bank Manager Login',
    });
    this.homeButton = page.getByRole('button', { name: 'Home' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

  async clickBankManagerLoginButton() {
    await this.bankManagerLoginButton.click();
  }
}
