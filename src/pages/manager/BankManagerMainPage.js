import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerTabButton = page.getByRole('button', { name: 'Add Customer' }).first();
    this.openAccountTabButton = page.getByRole('button', { name: 'Open Account' })
    this.customersTabButton = page.getByRole('button', { name: 'Customers' })
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async reload() {
    await this.page.reload();
  }

  async clickAddCustomerTabButton() {
    await this.addCustomerTabButton.click();
  }

  async clickOpenAccountTabButton() {
    await this.openAccountTabButton.click();
  }

  async clickCustomersTabButton() {
    await this.customersTabButton.click();
  }

  async assertAddCustomerTabButtonIsVisible() {
    await expect(this.addCustomerTabButton).toBeVisible()
  }

  async assertOpenAccountTabButtonIsVisible() {
    await expect(this.openAccountTabButton).toBeVisible();
  }

  async assertCustomersTabButtonIsVisible() {
    await expect(this.customersTabButton).toBeVisible();
  }
}
