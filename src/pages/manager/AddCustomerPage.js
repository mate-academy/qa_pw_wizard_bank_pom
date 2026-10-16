import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;

    this.fieldFirstName = page.getByPlaceholder('First Name');
    this.fieldLastName = page.getByPlaceholder('Last Name');
    this.fieldPostalCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async reload() {
    await this.page.reload();
  }

  async fillFieldFirstName(firstName) {
    await this.fieldFirstName.fill(firstName);
  }

  async assertFieldFirstNameHasValue(firstName) {
    await expect(this.fieldFirstName).toHaveValue(firstName);
  }

  async fillFieldLastName(lastName) {
    await this.fieldLastName.fill(lastName);
  }

  async assertFieldLastNameHasValue(lastName) {
    await expect(this.fieldLastName).toHaveValue(lastName);
  }

  async fillFieldPostalCode(postCode) {
    await this.fieldPostalCode.fill(postCode);
  }

  async assertFieldPostalCodeHasValue(postCode) {
    await expect(this.fieldPostalCode).toHaveValue(postCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }
}
