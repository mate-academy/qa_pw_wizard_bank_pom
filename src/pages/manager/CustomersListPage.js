import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.table = page.getByRole('table');
    this.row = this.table.getByRole('row');
    this.lastRow = this.table.getByRole('row').last();
    this.firstRow = this.table.getByRole('row').first();
    this.lastRowFirstCell = this.lastRow.getByRole('cell').nth(0);
    this.lastRowSecondCell = this.lastRow.getByRole('cell').nth(1);
    this.lastRowThirdCell = this.lastRow.getByRole('cell').nth(2);
    this.lastRowFourthCell = this.lastRow.getByRole('cell').nth(3);
    this.firstRowFirstCell = this.firstRow.getByRole('cell').nth(0);
    this.firstRowSecondCell = this.firstRow.getByRole('cell').nth(1);
    this.firstRowThirdCell = this.firstRow.getByRole('cell').nth(2);
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForLoading() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertCustomerDataInLastRow({ firstName, lastName, postCode }) {
    await expect(this.lastRowFirstCell).toHaveText(firstName);
    await expect(this.lastRowSecondCell).toHaveText(lastName);
    await expect(this.lastRowThirdCell).toHaveText(postCode);
  }

  async assertCustomerDataInFirstRow({ firstName, lastName, postCode }) {
    await expect(this.lastRowFirstCell).toHaveText(firstName);
    await expect(this.lastRowSecondCell).toHaveText(lastName);
    await expect(this.lastRowThirdCell).toHaveText(postCode);
  }

  async assertNewCustomerHasNoAccount() {
    await expect(this.lastRowFourthCell).toBeEmpty();
  }

  async assertNewCustomerHasAccount() {
    await expect(this.lastRowFourthCell).not.toBeEmpty();
  }

  async deleteNewCustomer() {
    await this.lastRow.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerDataDeleted({ firstName, lastName, postCode }) {
    await expect(this.table).not.toContainText(firstName);
    await expect(this.table).not.toContainText(lastName);
    await expect(this.table).not.toContainText(postCode);
  }

  async reloadPage() {
    await this.page.reload();
  }

  async fillSearchFieldWithFirstName(firstName) {
    await this.searchCustomerField.fill(firstName);
  }

  async fillSearchFieldWithLastName(lastName) {
    await this.searchCustomerField.fill(lastName);
  }

  async fillSearchFieldWithPostCode(postCode) {
    await this.searchCustomerField.fill(postCode);
  }

  async assertOnlyOneRowPresent() {
    await expect(this.row).toHaveCount(2);
}
}
