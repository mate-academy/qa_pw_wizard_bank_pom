import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.tableHeader = page.getByRole('row').first();
    this.headerFirstCell = this.tableHeader.getByRole('cell').nth(0);
    this.headerSecondCell = this.tableHeader.getByRole('cell').nth(1);
    this.headerThirdCell = this.tableHeader.getByRole('cell').nth(2);
    this.lastRow = page.locator('tbody tr').last()
    this.lastRowAmountCell = this.lastRow.locator('td').nth(1)
    this.lastRowTypeCell = this.lastRow.locator('td').nth(2)
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/listTx');
  }
  async reload() {
    await this.page.reload();
  }

  async assertFirstRowAmountContainsText(amount) {
    await expect(this.lastRowAmountCell).toContainText(amount);
  }

  async assertFirstRowTypeContainsText(type) {
    await expect(this.lastRowTypeCell).toContainText(type);
  }

  async assertFirstRowIsHidden() {
    await expect(this.lastRow).toBeHidden();
  }

  async assertHeaderIsVisible() {
    await expect(this.tableHeader).toBeVisible();
  }

  async assertHeaderFirstCellContainsText(text) {
    await expect(this.headerFirstCell).toContainText(text);
  }

  async assertHeaderSecondCellContainsText(text) {
    await expect(this.headerSecondCell).toContainText(text);
  }

  async assertHeaderThirdCellContainsText(text) {
    await expect(this.headerThirdCell).toContainText(text);
  }

  async assertLastRowAmountVisible() {
    await this.page.waitForSelector('tbody tr')
    await expect(this.lastRowAmountCell).toBeVisible();
  }

}
