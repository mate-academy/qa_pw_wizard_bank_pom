import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async assertAddCustomerButtonIsVisible() {
    const addCustomerButton = this.page.getByRole('button', { name: 'Add Customer' });
    await expect(addCustomerButton).toBeVisible();
  }

  async assertOpenAccountButtonIsVisible() {
    const openAccountButton = this.page.getByRole('button', { name: 'Open Account' });
    await expect(openAccountButton).toBeVisible();
  }

  async assertCustomersButtonIsVisible() {
    const customersButton = this.page.getByRole('button', { name: 'Customers' });
    await expect(customersButton).toBeVisible();
  }




}
