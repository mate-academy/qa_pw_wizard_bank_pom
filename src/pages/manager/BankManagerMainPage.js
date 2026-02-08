import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = this.page.getByRole('button', { name: "Add Customer" });
    this.openAccountButton = this.page.getByRole('button', { name: "Open Account" });
    this.customersButton = this.page.getByRole('button', { name: "Customers" });

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  };
  
  async assureAddCustomerButtonVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  };

  async assureOpenAccountButtonVisible() {
    await expect(this.openAccountButton).toBeVisible();
  };

  async assureCustomersButtonVisible() {
    await expect(this.customersButton).toBeVisible();
  };

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
