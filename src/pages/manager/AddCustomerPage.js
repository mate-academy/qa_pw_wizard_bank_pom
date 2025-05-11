const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page) {
    this.page = page; 
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer'});
    this.customerButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstName(firstName) {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastName.fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.postCode.fill(postCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async pageReload() {
    await this.page.reload();
  }

  async clickCustomerButton() {
    await this.customerButton.click();
  }
}
