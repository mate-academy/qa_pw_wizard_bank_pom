import { th } from '@faker-js/faker';

const { expect } = require('@playwright/test');

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', { name: 'Customer Login' })
    this.bankManagerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' }); 
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickManagerLoginButton() {
    await this.bankManagerLoginButton.click();
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }

}