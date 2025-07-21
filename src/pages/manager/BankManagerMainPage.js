import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async clickCustomersButton() {
    await this.page.getByRole('button', { name: 'Customers' }).click();
  }

  async clickOpenAccountButton() {
    await this.page.getByRole('button', { name: 'Open Account' }).click();
  }

  async clickAddCustomersButton() {
    await this.page.getByRole('button', { name: 'Add Customer' }).click();
  }
}
