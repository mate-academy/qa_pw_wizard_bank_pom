import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

    async reload() {
    await this.page.reload();
  }

  async fillFirstNameField(name) {
    await this.firstNameField.fill(name);
  }

  async fillLastNameField(name) {
    await this.lastNameField.fill(name);
  }

  async fillPostCodeField(code) {
    await this.postCodeField.fill(code);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }
}



