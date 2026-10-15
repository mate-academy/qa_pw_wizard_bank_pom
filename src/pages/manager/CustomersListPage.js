import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchField = page.getByRole('textbox', { name: 'Search Customer' });
    this.rows = page.getByRole('row');
  }

  async open() {
    this.page.goto('/angularJs-protractor/BankingProject/#/manager/list', {
  waitUntil: 'domcontentloaded',
});
  }

  async searchCustomer(text) {
    await this.searchField.fill(text);
  }

  getCustomerRow(text) {
    return this.rows.filter({ hasText: text });
  }

  async assertCustomerRowIsVisible(text) {
    await expect(this.getCustomerRow(text)).toBeVisible();
  }

  async assertCustomerRowIsHidden(text) {
    await expect(this.getCustomerRow(text)).toBeHidden();
  }

  async assertOnlyOneCustomerRowIsVisible() {
    // header row + 1 matching data row = 2
    await expect(this.rows).toHaveCount(2);
  }

  async assertLastRowContainsText(text) {
    await expect(this.rows.last()).toContainText(text);
  }

  async assertLastRowAccountCellIsEmpty() {
    const accountCell = this.rows.last().getByRole('cell').nth(3);
    await expect(accountCell).toBeEmpty();
  }

  async assertLastRowAccountCellIsNotEmpty() {
    const accountCell = this.rows.last().getByRole('cell').nth(3);
    await expect(accountCell).not.toBeEmpty();
  }

  async clickDeleteButtonForRow(text) {
    await this.getCustomerRow(text)
      .getByRole('button', { name: 'Delete' })
      .click();
  }
}