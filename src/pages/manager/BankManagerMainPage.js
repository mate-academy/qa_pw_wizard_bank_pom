import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;

    this.addCastomerButton = page.getByRole('button', {
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
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async assertAddCastomerButtonToBeVisible() {
    await expect(this.addCastomerButton).toBeVisible();
  }

  async assertOpenAccountButtonToBeVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async assertCustomersButtonToBeVisible() {
    await expect(this.customersButton).toBeVisible();
  }

}
