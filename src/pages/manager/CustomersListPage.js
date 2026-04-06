import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.lastRow = page.getByRole('row').last();
    this.lastRowCells = page.getByRole('row').last().getByRole('cell');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async fillSearchInput(text) {
    await this.searchInput.fill(text);
  }

  async assertLastRowFirstNameContainsText(text) {
    await expect(this.lastRowCells.nth(0)).toContainText(text);
  }

  async assertLastRowLastNameContainsText(text) {
    await expect(this.lastRowCells.nth(1)).toContainText(text);
  }

  async assertLastRowPostCodeContainsText(text) {
    await expect(this.lastRowCells.nth(2)).toContainText(text);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowCells.nth(3)).toHaveText('');
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.lastRowCells.nth(3)).not.toHaveText('');
  }

  async clickDeleteButtonForCustomer(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    const row = this.page.getByRole('row').filter({ hasText: fullName });
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerRowIsNotPresent(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    const row = this.page.getByRole('row').filter({ hasText: fullName });
    await expect(row).toBeHidden();
  }

  async assertOnlyOneRowIsVisible() {
    // header row + 1 data row = 2 rows total
    await expect(this.page.getByRole('row')).toHaveCount(2);
  }
}
