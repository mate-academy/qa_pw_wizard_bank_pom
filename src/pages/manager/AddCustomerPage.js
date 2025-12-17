import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).nth(1);
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstNameField(text) {
    await this.firstNameField.fill(text);
  }

  async fillLastNameField(text) {
    await this.lastNameField.fill(text);
  }

  async fillPostCodeField(value) {
    await this.postCodeField.fill(value);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async refreshPage() {
    //await this.page.reload();
    await this.page.on('dialog', dialog => dialog.accept());
  }

  async clickCustomerButton() {
    await this.customersButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }
}
