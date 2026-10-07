import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.bankManagerButton = page.getByRole('button', {
      name: 'Bank Manager Login',});
    this.addCustomerButton = page.getByRole('button', {
      name: 'Add Customer',
    });
    this.openAccountButton = page.getByRole('button', {
      name: 'Open Account',
    });
    this.customersButton = page.getByRole('button', {
      name: 'Customers',
    });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickBankManagerLoginButton() {
    await this.bankManagerButton.click();
  }
  async assertAddCustomerButtonVisibility() {
    await expect(this.addCustomerButton).toBeVisible();
  }
  async assertOpenAccountButtonVisibility() {
    await expect(this.openAccountButton).toBeVisible();
  }
  async assertCustomersButtonVisibility() {
    await expect(this.customersButton).toBeVisible();
  }
}
