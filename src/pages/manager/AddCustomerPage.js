import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerFormButton = page.getByRole('form').getByRole('button',{ name: 'Add Customer'});
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
  async reload() {
    await this.page.reload();
  }
  async fillFirstNameField(firstName) {
    await this.firstNameField.fill(firstName);
  }
  async fillLastNameField(lastName){
    await this.lastNameField.fill(lastName);
  }
  async fillPostCodeField(postCode) {
    await this.postCodeField.fill(postCode);
  }
  async clickAddCustomerFormButton() {
    await this.addCustomerFormButton.click();
  }
}
