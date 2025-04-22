const { expect } = require('@playwright/test');

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page
      .getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page
      .getByRole('button', { name: 'Open Account' });
    this.customersButton = page
      .getByRole('button', { name: 'Customers' });
    this.firstNameField = page
      .getByPlaceholder('First Name');
    this.lastNameField = page
      .getByPlaceholder('Last Name');
    this.postCodeField = page
      .getByPlaceholder('Post Code');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }
  async waitForBankManagerPage() {
    await this.page.waitForURL();
  }
  async assertAddCustomerButtomIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }
  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }
  async assertCustomersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }
  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }
  async fillFirstName(firstName) {
    await this.firstNameField.fill(firstName);
  }
  async fillLastName(lastName) {
    await this.lastNameField.fill(lastName);
  }
  async fillPostCodeField(postCode) {
    await this.postCodeField.fill(postCode);
  }
  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }
}