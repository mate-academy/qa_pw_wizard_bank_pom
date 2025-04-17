const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page) {
    this.page = page; 
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.submitButton = page.getByRole('button', { name: /Add Customer/i }).nth(1);
    this.addCustomerButton = page.getByRole('button', { name: /Add Customer/i }).nth(0);
    this.openAccountButton = page.getByRole('button', { name: /Open Account/i }).nth(0);
    this.customersButton = page.getByRole('button', { name: /Customers/i }).nth(0);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async reload() {
    await this.page.reload();
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async fillFirstNameField(fName) {
    await this.firstNameField.fill(fName);
  }

  async fillLastNameField(lName) {
    await this.lastNameField.fill(lName);
  }

  async fillPostCodeField(pCode) {
    await this.postCodeField.fill(pCode);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async createCustomer(fName, lName, pCode) {
    await this.fillFirstNameField(fName);
    await this.fillLastNameField(lName);
    await this.fillPostCodeField(pCode);
    await this.clickSubmitButton();
    await this.reload();
  }
}