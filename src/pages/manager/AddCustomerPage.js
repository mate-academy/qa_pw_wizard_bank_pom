import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByRole('textbox').nth(0);
    this.lastNameField = page.getByRole('textbox').nth(1);
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('button').filter({hasText: 'Add Customer'}).nth(1);
    this.customersButton = page.getByRole('button').filter({hasText: 'Customers'});
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });

    this.tableOfCustomers = page.getByRole('table');
    this.lastRow = this.tableOfCustomers.getByRole('row').last();
    this.accountNumberEmpty = this.lastRow.getByRole('cell').nth(3);
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
    await this.page.reload();
  }

  async waitForLoading() {
    await this.page.waitForURL(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list',
    );
  }

  async clickCustomerButton() {
    await this.customersButton.click();
  }

  async checkLastRow(text) {
    await expect(this.lastRow).toContainText(text);
  }

  async checkAccountNumberEmpty() {
    await expect(this.accountNumberEmpty).toBeEmpty();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }
}
