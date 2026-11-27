
import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;

    this.tableHeader = page.getByRole('row').first();

    this.headerFirstCell = this.tableHeader.getByRole('cell').nth(0);

    this.headerSecondCell = this.tableHeader.getByRole('cell').nth(1);

    this.headerThirdCell = this.tableHeader.getByRole('cell').nth(2);

    this.transactionRows = page.locator('table tbody tr');

    this.firstRow = page.getByRole('row').nth(1);

    this.firstRowAmountCell = this.firstRow.getByRole('cell').nth(1);

    this.firstRowTypeCell = this.firstRow.getByRole('cell').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/listTx');
  }

  async reload() {
    await this.page.reload();
  }

  async assertFirstRowAmountContainsText(amount) {
    await expect(this.firstRowAmountCell).toContainText(amount);
  }

  async assertFirstRowTypeContainsText(type) {
    await expect(this.firstRowTypeCell).toContainText(type);
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

  async assertLatestTransactionContainsAmountAndType(amount, type) {
    const matchingTransactions = this.transactionRows.filter({
      hasText: amount
    });

    const latestTransaction = matchingTransactions.last();

    await expect(latestTransaction).toBeVisible();

    await expect(
      latestTransaction.getByRole('cell').nth(1)
    ).toHaveText(amount);

    await expect(
      latestTransaction.getByRole('cell').nth(2)
    ).toHaveText(type);
  }
}
