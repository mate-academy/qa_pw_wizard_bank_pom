import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
  }

  async fillLastName(lastName) {
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.page.getByRole('textbox', { name: 'Post Code' }).fill(postCode);
  }

  async addCustomer() {
    await this.page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
  }

  async pageReload() {
    await this.page.reload();
  }

  async gotoCustomersPage() {
    await this.page.getByRole('button', { name: 'Customers' }).click();
  }
}
