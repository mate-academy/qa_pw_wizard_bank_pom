import { expect } from '@playwright/test';

export class CustomerLoginPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.getByTestId('userSelect');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/customer');
  }
};