import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;

    this.bankLoginButton = page.getByRole('button', {
      name: 'Bank Manager Login'
    });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickBankLoginButton() {
    await this.bankLoginButton.click();
  }
  
}