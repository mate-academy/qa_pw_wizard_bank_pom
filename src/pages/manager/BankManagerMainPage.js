import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).first();
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  
  async assertAddCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async asserCustomersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }
}
