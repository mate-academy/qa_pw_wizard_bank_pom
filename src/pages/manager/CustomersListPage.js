import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.getByRole('row').last();
    this.lastRowFirstNameCell = this.lastRow.getByRole('cell').nth(0);
    this.lastRowLastNameCell = this.lastRow.getByRole('cell').nth(1);
    this.lastRowPostCodeCell = this.lastRow.getByRole('cell').nth(2);
    this.lastRowAccountNumberCell = this.lastRow.getByRole('cell').nth(3);
    this.searchField = page.getByPlaceholder('Search Customer');
    this.customerRows = page.locator('tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertFirstName(firstName) {
    await expect(this.lastRowFirstNameCell).toContainText(firstName);
  }

  async assertLastName(lastName) {
    await expect(this.lastRowLastNameCell).toContainText(lastName);
  }
  async assertPostCode(postCode) {
    await expect(this.lastRowPostCodeCell).toContainText(postCode);
  }
  async assertAccountNumber(accountNumber) {
    await expect(this.lastRowAccountNumberCell).toContainText(accountNumber);
  }

  async reload() {
    await this.page.reload();
  }

  async fillSearchField(text) {
    await this.searchField.fill(text);
  }

  async assertCustomerRowIsVisible(firstName) {
    await expect(this.getCustomerRow(firstName)).toBeVisible();
  }

  async assertOnlyOneCustomerRowIsPresent() {
    await expect(this.customerRows).toHaveCount(1);
  }

  async clickDeleteButtonForCustomer(firstName) {
    await this.getCustomerRow(firstName).getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerRowIsHidden(firstName) {
    await expect(this.getCustomerRow(firstName)).toBeHidden();
  }

  getCustomerRow(firstName) {
    return this.page.getByRole('row').filter({ hasText: firstName });
  }
}
