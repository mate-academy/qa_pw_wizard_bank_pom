import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchField = page.getByPlaceholder('Search Customer');
    this.tableBodyRows = page.locator('tbody').getByRole('row');
    this.lastRow = page.getByRole('row').last();
    this.lastRowFirstNameCell = this.lastRow.getByRole('cell').nth(0);
    this.lastRowLastNameCell = this.lastRow.getByRole('cell').nth(1);
    this.lastRowPostCodeCell = this.lastRow.getByRole('cell').nth(2);
    this.lastRowAccountNumberCell = this.lastRow.getByRole('cell').nth(3);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async reload() {
    await this.page.reload();
  }
  getCustomerRow(name) {
    return this.page.getByRole('row').filter({ hasText: name });
  }
  async clickDeleteButtonForCustomer(name) {
    await this.getCustomerRow(name).getByRole('button', { name: 'Delete'}).click();
  }
  async fillSearchField(text) {
    await this.searchField.fill(text);
  }
  async assertLastRowFirstNameContainsText(firstName) {
    await expect(this.lastRowFirstNameCell).toContainText(firstName);
  }
  async assertLastRowLastNameContainsText(lastName) {
    await expect(this.lastRowLastNameCell).toContainText(lastName);
  }
  async assertLastRowPostCodeContainsText(postCode) {
    await expect(this.lastRowPostCodeCell).toContainText(postCode);
  }
  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumberCell).toBeEmpty();
  }
  async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.lastRowAccountNumberCell).not.toBeEmpty();
  }
  async assertCustomerRowIsHidden(name) {
    await expect(this.getCustomerRow(name)).toBeHidden();
  }
  async assertCustomerRowIsVisible(text) {
    await expect(this.getCustomerRow(text)).toBeVisible();
  }
  async assertOnlyOneRowIsVisible() {
    await expect(this.tableBodyRows).toHaveCount(1);
  }
}
