const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');

    this.addCustomerButton = page.getByRole('button', {name: 'Add Customer'}).last()
    this.customersButton = page.getByRole('button', {name: 'Customers'})

    this.lastRowOfGeneralTable = page.getByRole('row').last()
    this.firstNameOfLastRow = this.lastRowOfGeneralTable.getByRole('cell').nth(0)
    this.lastNameOfLastRow = this.lastRowOfGeneralTable.getByRole('cell').nth(1)
    this.postCodeOfLastRow = this.lastRowOfGeneralTable.getByRole('cell').nth(2)
    this.accountNumberOfLastRow = this.lastRowOfGeneralTable.getByRole('cell').nth(3)
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async reloadPage() {
    await this.page.reload();
  }

  async fillFirstNameField(value) {
    await this.firstNameField.fill(value);
  }

  async fillLastNameField(value) {
    await this.lastNameField.fill(value);
  }

  async fillPostCodeField(value) {
    await this.postCodeField.fill(value);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click()
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertFirstNameOfLastRow(value) {
    await expect(this.firstNameOfLastRow).toContainText(value)
  }

  async assertLastNameOfLastRow(value) {
    await expect(this.lastNameOfLastRow).toContainText(value)
  }

  async assertPostCodeOfLastRow(value) {
    await expect(this.postCodeOfLastRow).toContainText(value)
  }

  async assertAccountNumberOfLastRowIsEmpty(value) {
    await expect(this.accountNumberOfLastRow).toHaveText(value)
  }
}
