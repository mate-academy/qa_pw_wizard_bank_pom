import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.bankManagerLoginButton = page.getByRole('button', { 
      name: 'Bank Manager Login' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickBankManagerLoginButton() {
    await this.bankManagerLoginButton.click();
  }
}
