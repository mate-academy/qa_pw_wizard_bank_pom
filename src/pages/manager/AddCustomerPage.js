import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postalCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerFormButton = page.locator('form').getByRole('button', {
      name: 'Add Customer',
    });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async fillPostalCode(postalCode) {
    await this.postalCodeField.fill(postalCode);
  }

  async clickAddCustomer() {
    await this.addCustomerFormButton.click();
  }
}
