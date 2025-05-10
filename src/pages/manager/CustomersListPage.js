import { th } from '@faker-js/faker';

const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.customerTableDeleteRow = page.getByRole('row').nth(6);
    this.customerTableLastRow = page.getByRole('row').last();
    this.tableSearch = page.locator('table');
    this.tableSearchRow = this.tableSearch.locator('tr')
    this.tableLastRowFirstCell = this.customerTableLastRow.locator('td').nth(0);
    this.tableLastRowSecondCell = this.customerTableLastRow.locator('td').nth(1);
    this.tableLastRowThirdCell = this.customerTableLastRow.locator('td').nth(2);
    this.tableLastRowFourthCell = this.customerTableLastRow.locator('td').nth(3);
    this.tableLastRowFifthCell = this.customerTableLastRow.locator('td').nth(4);
    this.tableLastRowDeleteButton = this.tableLastRowFifthCell.getByRole('button');
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async tableLastRowFirstCellContainText(text) {
    await expect(this.tableLastRowFirstCell).toContainText(text);
  }

  async tableLastRowSecondCellContainText(text) {
    await expect(this.tableLastRowSecondCell).toContainText(text);
  }

  async tableLastRowThirdCellContainText(text) {
    await expect(this.tableLastRowThirdCell).toContainText(text);
  }

  async tableLastRowFourthCellEmpty() {
    await expect(this.tableLastRowFourthCell).toBeEmpty();
  }

  async tableLastRowFourthCellNotEmpty() {
    await expect(this.tableLastRowFourthCell).not.toBeEmpty();
  }

  async clickTableLastRowDeleteButton() {
    await this.tableLastRowDeleteButton.click();
  }

  async customerTableDeleteRowHidden() {
    await expect(this.customerTableDeleteRow).toBeHidden();
  }

  async tableRowHasText(fName) {
    const row = this.tableSearchRow.filter({ hasText: fName });
    await expect(row).toBeVisible();
  }

  async assertOnlyOneCustomerRow() {
    const countRow = await this.tableSearchRow.count();
    expect(countRow).toBe(2);
  }

  async reloadPage() {
    await this.page.reload();
  }

  async fillSearchField(name) {
    await this.searchField.fill(name);
  }
}