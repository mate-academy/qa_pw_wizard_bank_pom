import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.rows = page.locator('table tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async search(value) {
    await this.searchInput.fill(value);
  }

  async deleteFirstRow() {
    await this.rows.first().getByRole('button', { name: 'Delete' }).click();
  }

  async assertRowsCount(count) {
    await expect(this.rows).toHaveCount(count);
  }

  async assertSingleRowContainsText(text) {
    await expect(this.rows).toHaveCount(1);
    await expect(this.rows.first()).toContainText(text);
  }

  async assertLastRowHasValues({ firstName, lastName, postCode }) {
    const lastRow = this.rows.last();
    const cells = lastRow.locator('td');
    await expect(cells.nth(0)).toHaveText(firstName);
    await expect(cells.nth(1)).toHaveText(lastName);
    await expect(cells.nth(2)).toHaveText(postCode);
  }

  async assertLastRowAccountNumberIsEmpty() {
    const accCell = this.rows.last().locator('td').nth(3);
    const text = (await accCell.textContent())?.trim() || '';
    expect(text.length).toBe(0);
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    const accCell = this.rows.last().locator('td').nth(3);
    const text = (await accCell.textContent())?.trim() || '';
    expect(text.length).toBeGreaterThan(0);
  }
}
