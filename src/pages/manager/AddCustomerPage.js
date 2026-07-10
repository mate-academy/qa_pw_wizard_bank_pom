import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCodeField = page.getByRole('textbox', { name: 'Post Code' });
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstNameField (firstName) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastNameField (lastName) {
    await this.lastNameField.fill(lastName);
  }

  async fillPostalCodeField (postalCode) {
    await this.postalCodeField.fill(postalCode);
  }

  async clickAddCustomerButton () {
    await this.addCustomerButton.click();
  }

  async reload() {
    await this.page.reload();
  }


}
