import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', {   name: 'Customer Login',});
    this.managerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
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

  async clickManagerLoginButton(){
    await this.managerLoginButton.click();
  }

  async assertAddCustomerButton(){
    await expect(this.addCustomerButton).toBeVisible();
  }


  async assertOpenAccountButton(){
    await expect(this.openAccountButton).toBeVisible();
  }

  async assertCustomersButton(){
    await expect(this.customersButton).toBeVisible();
  }
}
