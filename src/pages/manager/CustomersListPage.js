const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.getByRole('row').last();
    this.accountNumberCell = this.lastRow.getByRole('cell').nth(3);
    this.searchField = this.page.getByPlaceholder('Search Customer');
  
    this.firstRow = page.getByRole('row').nth(1);
    this.firstNameCell = this.firstRow.getByRole('cell').nth(0);

    this.lastNameCell = this.firstRow.getByRole('cell').nth(1);

    this.postCodeCell = this.firstRow.getByRole('cell').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickDeleteButton(value) {
    await this.page.getByRole('row', { name: value }).getByRole('button').click();
  }

  async assertCustomerRowIsNotPresentInTable(value) {
    await expect(this.page.getByRole('row', { name: value })).toHaveCount(0);
  }

  async reload() {
    await this.page.reload();
  }

  async assertCustomerRowHasAccountNumber(value) {
    await expect(this.accountNumberCell).not.toBeEmpty();
  }

  async fillSearchField(value) {
    await this.searchField.fill(value);
  }

  async assertCustomerRowHasFirstName(value) {
    await expect(this.firstNameCell).toContainText(value);
  }

  async assertCustomerTableContainsSingleRow() {
    await expect(this.page.getByRole('row')).toHaveCount(2);
  }

  async assertCustomerRowHasLastName(value) {
    await expect(this.lastNameCell).toContainText(value);
  }

  async assertCustomerRowHasPostCode(value) {
    await expect(this.postCodeCell).toContainText(value);
  }
}