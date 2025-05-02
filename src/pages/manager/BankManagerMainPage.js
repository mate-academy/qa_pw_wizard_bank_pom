const { expect } = require('@playwright/test');

export class BankManagerMainPage {
  constructor(page) {
    this.page = page; 
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async visibelAddCustomerButton() {
    await expect(this.addCustomerButton).toBeVisible(); 
  }

  async visibleOpenAccountButton() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async visibleCustomersButton() {
    await expect(this.customersButton).toBeVisible();
  }

}