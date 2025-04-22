const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.getByRole('row').last();
    this.rawCustomers = page.getByRole('row');
    this.lastRowFirstCell = this.lastRow.getByRole('cell').nth(0);
    this.lastRowSecondCell = this.lastRow.getByRole('cell').nth(1);
    this.lastRowThirdCell = this.lastRow.getByRole('cell').nth(2);
    this.lastRowForthCell = this.lastRow.getByRole('cell').nth(3);
    this.searchField = page.getByPlaceholder('Search Customer');
    this.firstRow = page.getByRole('row').nth(1);
    this.firstRowFirstCell = this.firstRow.getByRole('cell').nth(0);
    this.firstRowSecondCell = this.firstRow.getByRole('cell').nth(1);
    this.firstRowThirdCell = this.firstRow.getByRole('cell').nth(2);
    this.secondRow = page.getByRole('row').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertLastRowFirstCellContainsText(text) {
    await expect(this.lastRowFirstCell).toContainText(text);
  }

  async assertLastRowSecondCellContainsText(text) {
    await expect(this.lastRowSecondCell).toContainText(text);
  }

  async assertLastRowThirdCellContainsText(text) {
    await expect(this.lastRowThirdCell).toContainText(text);
  }

  async assertLastRowForthCellContainsText(text) {
    await expect(this.lastRowForthCell).toContainText(text);
  }

  async fillSearchField(text) {
    await this.searchField.fill(text);
  }

  async assertFirstRowFirstCellContainsText(text) {
    await expect(this.firstRowFirstCell).toContainText(text);
  }

  async assertFirstRowSecondCellContainsText(text) {
    await expect(this.firstRowSecondCell).toContainText(text);
  }

  async assertFirstRowThirdCellContainsText(text) {
    await expect(this.firstRowThirdCell).toContainText(text);
  }

  async assertSecondRowIsHidden() {
    await expect(this.secondRow).toBeHidden();
  }
}
