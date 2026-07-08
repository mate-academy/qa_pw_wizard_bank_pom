import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async reload() {
    await this.page.reload();
  }

  async login() {
    await this.page.getByRole('button', { name: 'Bank Manager Login' }).click();
  }

  async openAccount() {
    await this.page.getByRole('button', { name: 'Open Account' }).click();
  }

  async assertAddCustomerButtonVisible() {
    const addCustomerButton = this.page.getByRole('button', { name: 'Add Customer' });
    await expect(addCustomerButton).toBeVisible();
  }

  async clickAddCustomerButton() {
    const addCustomerButton = this.page.getByRole('button', { name: 'Add Customer' });
    await addCustomerButton.click();
  }

  async assertOpenAccountButtonVisible() {
    const openAccountButton = this.page.getByRole('button', { name: 'Open Account' });
    await expect(openAccountButton).toBeVisible();
  }

  async clickOpenAccountButton() {
    const openAccountButton = this.page.getByRole('button', { name: 'Open Account' });
    await openAccountButton.click();
  }

  async assertCustomersButtonVisible() {
    const customersButton = this.page.getByRole('button', { name: 'Customers' });
    await expect(customersButton).toBeVisible();
  }

  async clickCustomersButton() {
    const customersButton = this.page.getByRole('button', { name: 'Customers' });
    await customersButton.click();
  }

}
