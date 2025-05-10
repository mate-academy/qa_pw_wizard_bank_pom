const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInputField = page.getByPlaceholder('First Name');
    this.lastNameInputField = page.getByPlaceholder('Last Name');
    this.postCodeInputField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });

    this.lastRow = page.getByRole('row').last();
    this.accountNumberCell = this.lastRow.getByRole('cell').nth(3);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstNameInputField(value) {
    await this.firstNameInputField.fill(value);
  }

  async fillLastNameInputField(value) {
    await this.lastNameInputField.fill(value);
  }

  async fillPostCodeInputField(value) {
    await this.postCodeInputField.fill(value);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async reload() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertCustomersTableContainsFirstName(value) {
    await expect(this.lastRow).toContainText(value);
  }

  async assertCustomersTableContainsLastName(value) {
    await expect(this.lastRow).toContainText(value);
  }

  async assertCustomersTableContainsPostalCode(value) {
    await expect(this.lastRow).toContainText(value);
  }

  async assertAccountNumberInCustomersTableIsEmpty() {
    await expect(this.accountNumberCell).toBeEmpty();
  }
}