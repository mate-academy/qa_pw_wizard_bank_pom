import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.tableRows = page.locator('table tbody tr');
    this.searchInput = page.locator('input[ng-model="searchCustomer"]');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async fillSearchInput(value) {
    if (!value) return;
    await this.searchInput.fill(value);
  }

  async assertOnlyOneRowIsVisible() {
    await expect(this.tableRows).toHaveCount(1);
  }

  async assertLastRowFirstNameContainsText(text) {
    await expect(this.tableRows.last().locator('td').nth(0)).toContainText(
      text,
    );
  }

  async assertLastRowLastNameContainsText(text) {
    await expect(this.tableRows.last().locator('td').nth(1)).toContainText(
      text,
    );
  }

  async assertLastRowPostCodeContainsText(text) {
    await expect(this.tableRows.last().locator('td').nth(2)).toContainText(
      text,
    );
  }

  async assertLastRowAccountNumberIsEmpty() {
    const accountNumberCell = this.tableRows.last().locator('td').nth(3);
    await expect(accountNumberCell).toBeEmpty();
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    const accountNumberCell = this.tableRows.last().locator('td').nth(3);
    const text = await accountNumberCell.innerText();

    expect(text.trim().length).toBeGreaterThan(0);
  }

  async clickDeleteButtonForCustomer(firstName, lastName) {
    const customerRow = this.page.locator('tr', {
      hasText: `${firstName} ${lastName}`,
    });
    await customerRow.locator('button[ng-click="deleteCust(cust)"]').click();
  }

  async assertCustomerRowIsNotPresent(firstName, lastName) {
    const customerRow = this.page.locator('tr', {
      hasText: `${firstName} ${lastName}`,
    });
    await expect(customerRow).not.toBeVisible();
  }
}
