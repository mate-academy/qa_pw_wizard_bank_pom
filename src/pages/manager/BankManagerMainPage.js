import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomersButton = page.getByRole('button', { name: 'Add Customer' }).first();
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async addCustomersButtonClick() {
    await this.addCustomersButton.first().click();
  }

  async openAccountButtonClick() {
    await this.openAccountButton.click();
  }

  async customersButtonClick() {
    await this.customersButton.click();
  }
}
