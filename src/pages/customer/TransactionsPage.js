import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.tableHeader = page.getByRole('row').first();
    this.headerDateTime = this.tableHeader.getByRole('cell').nth(0);
    this.headerAmount = this.tableHeader.getByRole('cell').nth(1);
    this.headerTransactionType = this.tableHeader.getByRole('cell').nth(2);
    this.firstRow = page.getByRole('row').nth(1);
    this.firstRowAmountCell = this.firstRow.getByRole('cell').nth(1);
    this.firstRowTypeCell = this.firstRow.getByRole('cell').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/listTx');
  }
};