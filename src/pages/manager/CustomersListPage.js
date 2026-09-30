import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableRows = page.locator('table tbody tr');
    this.lastRowCells = this.tableRows.last().getByRole('cell');
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  customerRow(firstName, lastName) {
    return this.tableRows
      .filter({ has: this.page.getByRole('cell', { name: firstName, exact: true }) })
      .filter({ has: this.page.getByRole('cell', { name: lastName, exact: true }) });
  }

  async clickDeleteForCustomer(firstName, lastName) {
    await this.customerRow(firstName, lastName)
      .getByRole('button', { name: 'Delete' })
      .click();
  }

  async assertCustomerIsPresent(firstName, lastName) {
    await expect(this.customerRow(firstName, lastName)).toHaveCount(1);
  }

  async assertCustomerIsNotPresent(firstName, lastName) {
    await expect(this.customerRow(firstName, lastName)).toHaveCount(0);
  }

  async assertCustomerInLastRow(firstName, lastName, postalCode) {
    await expect(this.lastRowCells.nth(0)).toHaveText(firstName);
    await expect(this.lastRowCells.nth(1)).toHaveText(lastName);
    await expect(this.lastRowCells.nth(2)).toHaveText(postalCode);
  }

  async assertNoAccountNumberInLastRow() {
    await expect(this.lastRowCells.nth(3)).toBeEmpty();
  }

  async assertAccountNumberInLastRowIsNotEmpty() {
    await expect(this.lastRowCells.nth(3)).not.toBeEmpty();
  }

  async fillSearchField(text) {
    await this.searchField.fill(text);
  }

  async assertTableHasRowsCount(count) {
    await expect(this.tableRows).toHaveCount(count);
  }
}
