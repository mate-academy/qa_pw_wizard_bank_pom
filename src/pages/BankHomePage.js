import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', {
      name: 'Customer Login',
    });

    this.managerLoginButton = page.getByRole('button', {
      name: 'Bank Manager Login',
    });

  }

  async openLoginPage() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async waitLoginPage () {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/login')
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }

  async clickBankManagerLoginButton() {
    await this.managerLoginButton.click();
  }

}
