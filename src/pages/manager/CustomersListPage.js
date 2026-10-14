import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.tableRows = page.locator('tbody tr');
    this.lastRow = this.tableRows.last();
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

  getRowByText(text) {
    return this.tableRows.filter({ hasText: text });
  }

  async fillSearchInput(text) {
    await this.searchInput.fill(text);
  }

  async clickDeleteButtonForCustomer(text) {
    await this.getRowByText(text)
      .getByRole('button', { name: 'Delete' })
      .click();
  }

  async assertLastRowFirstNameContainsText(text) {
    await expect(this.lastRowFirstNameCell).toContainText(text);
  }

  async assertLastRowLastNameContainsText(text) {
    await expect(this.lastRowLastNameCell).toContainText(text);
  }

  async assertLastRowPostCodeContainsText(text) {
    await expect(this.lastRowPostCodeCell).toContainText(text);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumberCell).toHaveText('');
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.lastRowAccountNumberCell).not.toHaveText('');
  }

  async assertCustomerRowIsVisible(text) {
    await expect(this.getRowByText(text)).toBeVisible();
  }

  async assertCustomerRowIsNotPresent(text) {
    await expect(this.getRowByText(text)).toHaveCount(0);
  }

  async assertTableHasRowsCount(count) {
    await expect(this.tableRows).toHaveCount(count);
  }
}

