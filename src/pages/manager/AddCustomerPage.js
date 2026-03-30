import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.customerFirstNameField = page.getByPlaceholder('First Name');
    this.customerLastNameField = page.getByPlaceholder('Last Name');
    this.customerPostCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).last();
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async addCustomer (firstname, lastname, postcode) {
    await this.customerFirstNameField.fill(firstname);
    await this.customerLastNameField.fill(lastname);
    await this.customerPostCodeField.fill(postcode);
    await this.addCustomerButton.click();
  }
}
