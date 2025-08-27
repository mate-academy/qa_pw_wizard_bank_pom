import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.table = page.locator('table');
    this.headerRow = this.table.locator('thead tr, tr').first();
    this.rows = this.table.locator('tbody tr');
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
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async assertHeaderIsVisible() {
    await this.waitForOpened();
    await expect(this.headerRow).toBeVisible({ timeout: 15000 });
  }

  async _bodyRows() {
    if (await this.rows.count()) return this.rows;
    return this.table.locator('tr:has(td):not(:has(th)):not(:first-child)');
  }

  async assertFirstRowIsVisible() {
    await this.waitForOpened();
    let rows = await this._bodyRows();

    if ((await rows.count()) === 0) {
      await this.page.waitForTimeout(300);
      await this.reload();
      rows = await this._bodyRows();
    }

    await expect(rows.first()).toBeVisible({ timeout: 15000 });
  }

  async assertFirstRowAmountContainsText(amount) {
    await this.assertFirstRowIsVisible();
    const rows = await this._bodyRows();
    const firstRowAmountCell = rows.first().locator('td').nth(1);
    await expect(firstRowAmountCell).toContainText(amount);
  }

  async assertFirstRowTypeContainsText(type) {
    await this.assertFirstRowIsVisible();
    const rows = await this._bodyRows();
    const firstRowTypeCell = rows.first().locator('td').nth(2);
    await expect(firstRowTypeCell).toContainText(type);
  }

  async assertFirstRowIsHidden() {
    await this.waitForOpened();
    await expect(this.rows).toHaveCount(0, { timeout: 15000 });
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
