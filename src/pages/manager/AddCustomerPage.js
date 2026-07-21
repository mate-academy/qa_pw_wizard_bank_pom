import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async waitForURL() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForOpenAccountURL() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount');
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

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async assertValidationMessageForFirstName() {
    await expect(this.firstName).toHaveJSProperty("validationMessage","Please fill out this field.");
  }
}
