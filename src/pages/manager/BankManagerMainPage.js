import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.loginManagerButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }
  async clickLoginAsManagerButton(){
    await this.loginManagerButton.click();
  }
  async assertAddCustomersButtonIsVisible(){
    await expect (this.addCustomerButton).toBeVisible();
  }
  async assertCustomersButtonIsVisible(){
    await expect (this.customersButton).toBeVisible();
  }
  async assertOpenAccountButtonIsVisible(){
    await expect (this.openAccountButton).toBeVisible();
  }
}
