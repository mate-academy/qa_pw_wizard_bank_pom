import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
    this.customersTab  = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }
  async assertLoaded() {
    await expect(this.addCustomerTab).toBeVisible();
    await expect(this.openAccountTab).toBeVisible();
    await expect(this.customersTab).toBeVisible();
  }

  async clickAddCustomerTab() {
    await this.addCustomerTab.click();
  }

  async clickOpenAccountTab() {
    await this.openAccountTab.click();
  }

  async clickCustomersTab() {
    await this.customersTab.click();
  }
}
