import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer', exact: true });
    this.openAccountButton = page.getByRole('button', {name: 'Open Account', exact: true });
    this.customersButton = page.getByRole('button', {name: 'Customers', exact: true });
    this.homeButton = page.getByRole('button', { name: 'Home', exact: true });
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

  async AddCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async OpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async CustomersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

  
}
