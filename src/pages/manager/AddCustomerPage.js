import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstNameField(firstName) {
    await this.firstName.fill(firstName);
  }

  async fillLastNameField(lastName) {
    await this.lastName.fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.postCode.fill(postCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async refreshPage() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async createCustomer(firstName, lastName, postCode) {
    await this.fillFirstNameField(firstName);
    await this.fillLastNameField(lastName);
    await this.fillPostCode(postCode);
    await this.clickAddCustomerButton();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }
}
