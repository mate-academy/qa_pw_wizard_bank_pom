import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.tableRows = page.getByRole('row');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/listTx');
  }
  async reload() {
    await this.page.reload();
  }

  async waitForPageToLoad() {
    await this.page.waitForURL('**/listTx');
  }

  async assertFirstRowAmountContainsText(amount) {
    const amountCell = this.tableRows.nth(1).getByRole('cell').nth(1);
    await expect(amountCell).toContainText(amount);
  }

  async assertFirstRowTypeContainsText(type) {
  const typeCell = this.tableRows.nth(1).getByRole('cell').nth(2);
  await expect(typeCell).toContainText(type);
  }

  async assertFirstRowIsHidden() {
    await expect(this.tableRows.nth(1)).toBeHidden();
  }

  async assertHeaderIsVisible() {
    await expect(this.tableRows.first()).toBeVisible();
  }

  async assertHeaderFirstCellContainsText(text) {
    const headerCell = this.tableRows.first().getByRole('cell').nth(0);
    await expect(headerCell).toContainText(text);
  }

  async assertHeaderSecondCellContainsText(text) {
    const headerCell = this.tableRows.first().getByRole('cell').nth(1);
    await expect(headerCell).toContainText(text);
  }

  async assertHeaderThirdCellContainsText(text) {
    const headerCell = this.tableRows.first().getByRole('cell').nth(2);
    await expect(headerCell).toContainText(text);
  }
}
