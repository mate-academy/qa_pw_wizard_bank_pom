import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.tableHeader = page.getByRole('row').first();
    this.headerFirstCell = this.tableHeader.getByRole('cell').nth(0);
    this.headerSecondCell = this.tableHeader.getByRole('cell').nth(1);
    this.headerThirdCell = this.tableHeader.getByRole('cell').nth(2);
    this.firstRow = page.getByRole('row').nth(1);
    this.firstRowAmountCell = this.firstRow.getByRole('cell').nth(1);
    this.firstRowTypeCell = this.firstRow.getByRole('cell').nth(2);
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/listTx');
  }

  async reload() {
    // Small delay so AngularJS has finished updating storage before reload
    await this.page.waitForTimeout(500);
    await this.page.reload();
  }

  async clickBackButton() {
    await this.backButton.click();
  }

  async clickResetButton() {
    await this.resetButton.click();
  }

  async assertTransactionHistoryIsVisible() {
    await expect(this.firstRow).toBeVisible();
  }

  async assertFirstRowAmountContainsText(amount) {
    await expect(this.firstRowAmountCell).toContainText(amount, { timeout: 10000 });
  }

  async assertFirstRowTypeContainsText(type) {
    await expect(this.firstRowTypeCell).toContainText(type, { timeout: 10000 });
  }

  async assertFirstRowIsHidden() {
    await expect(this.firstRow).toBeHidden();
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
}
