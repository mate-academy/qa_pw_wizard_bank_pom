import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
   
    this.headerCells = page.locator('table thead tr td');
  }


  async assertHeaderFirstCellContainsText(text) {
    await expect(this.headerCells.nth(0)).toContainText(text);
  }

  async assertHeaderSecondCellContainsText(text) {
    await expect(this.headerCells.nth(1)).toContainText(text);
  }

  async assertHeaderThirdCellContainsText(text) {
    await expect(this.headerCells.nth(2)).toContainText(text);
  }

 
  async assertFirstRowIsHidden() {
    const firstRow = this.page.locator('table tbody tr').first();
    await expect(firstRow).not.toBeVisible();
  }


  async assertTransactionExists(amount) {
    const firstRow = this.page.locator('table tbody tr').first();
   
    await expect(firstRow).toBeVisible({ timeout: 10000 });
    await expect(firstRow).toContainText(amount.toString());
  }

  async resetTransactions() {
    await this.page.getByRole('button', { name: 'Reset' }).click();
  }
}