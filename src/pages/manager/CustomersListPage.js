import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator('tbody tr');
    this.lastRow = this.rows.last();
    this.lastRowFirstNameCell = this.lastRow.getByRole('cell').nth(0);
    this.lastRowLastNameCell = this.lastRow.getByRole('cell').nth(1);
    this.lastRowPostCodeCell = this.lastRow.getByRole('cell').nth(2);
    this.lastRowAccountNumberCell = this.lastRow.getByRole('cell').nth(3);
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  getCustomerRow(firstName, lastName, postCode) {
    return this.rows
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .filter({ hasText: postCode });
  }

  async clickDeleteForCustomer(firstName, lastName, postCode) {
    await this.getCustomerRow(firstName, lastName, postCode)
      .getByRole('button', { name: 'Delete' })
      .click();
  }

  async assertCustomerRowIsNotPresent(firstName, lastName, postCode) {
    await expect(
      this.getCustomerRow(firstName, lastName, postCode),
    ).toHaveCount(0);
  }

  async assertLastRowFirstNameContainsText(text) {
    await expect(this.lastRowFirstNameCell).toContainText(text);
  }

  async assertLastRowLastNameContainsText(text) {
    await expect(this.lastRowLastNameCell).toContainText(text);
  }

  async assertLastRowPostCodeContainsText(text) {
    await expect(this.lastRowPostCodeCell).toContainText(text);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumberCell).toHaveText('');
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.lastRowAccountNumberCell).toHaveText(/\d+/);
  }

  async reload() {
    await this.page.reload();
  }

  async fillSearchField(text) {
    await this.searchField.fill(text);
  }

  async assertCustomerRowIsVisible(firstName, lastName, postCode) {
    await expect(
      this.getCustomerRow(firstName, lastName, postCode),
    ).toBeVisible();
  }

  async assertRowsCount(count) {
    await expect(this.rows).toHaveCount(count);
  }
}
