const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButtonForm = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstNameField(firstname) {
    await this.firstNameField.fill(firstname);
  }

  async fillLastNameField(lastname) {
    await this.lastNameField.fill(lastname);
  }
  
  async fillPostCodeField(postcode) {
    await this.postCodeField.fill(postcode);
  }
  
  async reloadPage() {
    await this.page.reload();
  }

  async clickAddCustomerButtonForm() {
    await this.addCustomerButtonForm.click();
  }

  
}