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

  async clickBankManagerLogin() {
    await this.page.getByRole('button', { name: 'Bank Manager Login' }).click();
  }

  async assertAddButtonExists(buttonName) {
    let getButton = this.page.getByRole('button', { name: buttonName });
    await expect(getButton).toBeVisible();
  }

  async clickHomeButton() {
    await this.page.getByRole('button', { name: 'Home' }).click();
  }

}
