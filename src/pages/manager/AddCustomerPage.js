const { expect } = require('@playwright/test');


export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.addCustonerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstName(firstName) {
    await this.firstName.fill(firstName);
  }

  async fillLasttName(lastName) {
    await this.lastName.fill(lastName);
  }

  async fillPostCode(zipCode) {
    await this.postCode.fill(zipCode);
  }

  async clickAddCustonerButton() {
    await this.addCustonerButton.click();
  }

  async reoladAddCustomerPage() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async waitForCustomerListPage () {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }
  
};