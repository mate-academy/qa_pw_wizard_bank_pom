import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.lastCustomerRow = page.locator('tbody tr').last();
    this.customerFirstName = this.lastCustomerRow.getByRole('cell').nth(0);
    this.customerLastName = this.lastCustomerRow.getByRole('cell').nth(1);
    this.customerPostalCode = this.lastCustomerRow.getByRole('cell').nth(2);
    this.customerAccountNumber = this.lastCustomerRow.getByRole('cell').nth(3);
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostalCode(postalCode) {
    await this.postalCodeInput.fill(postalCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertCustomerFirstNameIsPresentInTheTable(firstName) {
    await expect(this.customerFirstName).toHaveText(firstName);
  }

  async assertCustomerLastNameIsPresentInTheTable(lastName) {
    await expect(this.customerLastName).toHaveText(lastName);
  }

  async assertCustomerPostalCodeIsPresentInTheTable(postalCode) {
    await expect(this.customerPostalCode).toHaveText(postalCode);
  }

  async assertCustomerAccountNumberIsPresentInTheTable() {
    await expect(this.customerAccountNumber).toHaveText(/\S+/);
  }

  async assertCustomerAccountNumberIsNotPresentInTheTable() {
    await expect(this.customerAccountNumber).toHaveText('');
  }
}
