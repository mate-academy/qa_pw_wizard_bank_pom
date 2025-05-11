const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.table = page.getByRole('table');
    this.rows = this.table.locator('tbody tr');
    this.lastRow = this.table.getByRole('row').filter({ has: page.locator('td') }).last();    
    this.nameCell = this.lastRow.locator('td').nth(0);
    this.lastNameCell = this.lastRow.locator('td').nth(1);
    this.postCodeCell = this.lastRow.locator('td').nth(2);
    this.accountNumber = this.lastRow.locator('td').nth(3);
    this.searchField = this.page.locator('input[placeholder="Search Customer"]');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertFirstNameExist(firstName) {
    await expect(this.nameCell).toContainText(firstName);
  }

  async assertLastNameExist(lastName) {
    await expect(this.lastNameCell).toHaveText(lastName);
  }

  async assertPostCodeExist(postCode) {
    await expect(this.postCodeCell).toHaveText(postCode);
  }

  async assertAccountNumberExist() {
    await expect(this.accountNumber).toHaveText('');
  }

  async deleteLastRow() {
    await this.lastRow.getByRole('button', { name: 'Delete'}).click();
  }

  async assertCustomerDeleted(customerName) {
    await expect(this.nameCell).not.toHaveText(customerName);
  }

  async pageReload() {
    await this.page.reload();
  }

  async assertAccountNumberNotEmpty() {
    await expect(this.accountNumber).not.toHaveText('');
  }

  async fillValueToSearchField(value) {
    await this.searchField.fill(value);
  }

  async assertNoOtherRows() {
    await expect(this.rows).toHaveCount(1);
  }
}