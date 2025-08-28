import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.table = page.locator('table');
    this.headerRow = this.table.locator('thead tr').first();
  }

  _dataRows() {
    return this.table.locator('tbody tr:has(td)');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/listTx');
  }

  async waitForOpened() {
    await this.page.waitForURL('**/#/listTx', { timeout: 15000 });
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.table).toBeVisible({ timeout: 15000 });
  }

  async reload() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async assertHeaderIsVisible() {
    await this.waitForOpened();
    await expect(this.headerRow).toBeVisible({ timeout: 15000 });
  }

  async assertFirstRowIsVisible() {
    await this.waitForOpened();

    const deadline = Date.now() + 15000;
    let rows = this._dataRows();

    while (Date.now() < deadline) {
      if (await rows.count()) break;
      await this.page.waitForTimeout(500);
      await this.reload();
      rows = this._dataRows();
    }

    await expect(rows.first()).toBeVisible({ timeout: 3000 });
  }

  async assertFirstRowAmountContainsText(amount) {
    await this.assertFirstRowIsVisible();
    const amountCell = this._dataRows().first().locator('td').nth(1);
    await expect(amountCell).toContainText(amount);
  }

  async assertFirstRowTypeContainsText(type) {
    await this.assertFirstRowIsVisible();
    const typeCell = this._dataRows().first().locator('td').nth(2);
    await expect(typeCell).toContainText(type);
  }

  async assertFirstRowIsHidden() {
    await this.waitForOpened();
    await expect(this._dataRows()).toHaveCount(0, { timeout: 15000 });
  }

  async assertHeaderFirstCellContainsText(text) {
    await this.assertHeaderIsVisible();
    await expect(this.headerRow.locator('th, td').nth(0)).toContainText(text);
  }

  async assertHeaderSecondCellContainsText(text) {
    await this.assertHeaderIsVisible();
    await expect(this.headerRow.locator('th, td').nth(1)).toContainText(text);
  }

  async assertHeaderThirdCellContainsText(text) {
    await this.assertHeaderIsVisible();
    await expect(this.headerRow.locator('th, td').nth(2)).toContainText(text);
  }
}

