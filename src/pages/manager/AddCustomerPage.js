import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.submitButton = page.getByRole('button', { name: 'Add Customer' }).last();
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstNameField(firstName) {
    await this.firstNameField.fill(firstName);
  };

  async fillLastNameField(lastName) {
    await this.lastNameField.fill(lastName);
  };

  async fillPostCodeField(postCode) {
    await this.postCodeField.fill(postCode);
  };

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async reload() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }
}
