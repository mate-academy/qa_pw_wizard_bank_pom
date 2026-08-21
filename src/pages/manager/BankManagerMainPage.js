import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).last(); 
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' }).first();
    this.customersTab = page.getByRole('button', { name: 'Customers' });
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
  }
  async addCustomerTabToBeVisible() {
    await expect(this.addCustomerTab).toBeVisible();
  }
  async customersTabToBeVisible() {
    await expect(this.customersTab).toBeVisible();
  }
  async openAccountTabToBeVisible() {
    await expect(this.openAccountTab).toBeVisible();
  }
}