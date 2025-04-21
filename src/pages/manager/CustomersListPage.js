const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.lastTableRow = page.locator('table tbody tr').last();
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertTableContainsNewFirstName(firstName) {
    await expect(this.lastTableRow.getByRole('cell').nth(0)).toContainText(firstName);
  }

  async assertTableContainsNewLastName(lastName) {
    await expect(this.lastTableRow.getByRole('cell').nth(1)).toContainText(lastName);
  }

  async assertTableContainsNewPostCode(postCode) {
    await expect(this.lastTableRow.getByRole('cell').nth(2)).toContainText(postCode);
  }

  async assertTableIsNotContainsNewAccountNumber() {
    await expect(this.lastTableRow.getByRole('cell').nth(3)).toBeEmpty();
  }

  async assertTableContainsNewAccountNumber(firstName, lastName) {
    const customerRow = this.page.locator('table tbody tr').filter({
      has: this.page.locator('td', { hasText: firstName })})
    .filter({
      has: this.page.locator('td', { hasText: lastName }),
    });
    await expect(customerRow.getByRole('cell').nth(3)).not.toBeEmpty();
  }
  async deleteCustomerRow(firstName, lastName) {
    const customerRow = this.page.locator('table tbody tr').filter({
      has: this.page.locator('td', { hasText: firstName })})
    .filter({
      has: this.page.locator('td', { hasText: lastName }),
    });
    await customerRow.getByRole('button').click();
  }

  async assertCustomerIsDeleted(firstName, lastName) {
    const customerRow = this.page.locator('table tbody tr').filter({
      has: this.page.locator('td', { hasText: firstName })})
    .filter({
      has: this.page.locator('td', { hasText: lastName }),
    });
    await expect(customerRow).not.toBeVisible();
  }

  async fillToSearchField(word) {
    await this.searchField.fill(word);
  }

  async assertTableHaveOnlyOneRow() {
    const tableRows = this.page.locator('tbody tr');
    await expect(tableRows).toHaveCount(1);
  }
}