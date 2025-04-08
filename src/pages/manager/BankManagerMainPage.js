const { expect } = require('@playwright/test');

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.buttonAddCustomer = page.getByRole('button', { name: 'Add Customer' });
    this.buttonOpenAccount = page.getByRole('button', { name: 'Open Account' });
    this.buttonCustomers = page.getByRole('button', { name: 'Customers' });

  }

  async clickbuttonAddCustomer() {
    await this.buttonAddCustomer.click();
  }

  async assertButtonAddCustomer() {
    expect(this.buttonAddCustomer).toBeVisible();
  }

  async clickButtonOpenAccount() {
    await this.buttonOpenAccount.click();
  }

  async assertButtonOpenAccount() {
    expect(this.buttonOpenAccount).toBeVisible();
  }

  async clickButtonCustomersLogin() {
    await this.buttonCustomers.click();
  }

  async assertButtonCustomersLogin() {
    expect(this.buttonCustomers).toBeVisible();
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }
}