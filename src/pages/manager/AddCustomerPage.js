import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerFormButton = page
      .getByRole('form')
      .getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async reload() {
    await this.page.reload();
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.postCodeInput.fill(postCode);
  }

  async clickAddCustomerFormButton() {
    await this.addCustomerFormButton.click();
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostCode(postCode);
    await this.clickAddCustomerFormButton();
  }
}