import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.rows = page.locator('tbody tr');
    this.firstNameCells = page.locator('tbody tr td:nth-child(1)');
    this.sortByFirstNameLink = page.locator('thead a', {
      hasText: 'First Name',
    });
  }

  rowByName(firstName, lastName) {
    return this.rows
      .filter({
        has: this.page.getByRole('cell', { name: firstName, exact: true }),
      })
      .filter({
        has: this.page.getByRole('cell', { name: lastName, exact: true }),
      });
  }

  async searchCustomer(text) {
    await this.searchInput.fill(text);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async deleteCustomer(firstName, lastName) {
    await this.rowByName(firstName, lastName)
      .getByRole('button', { name: 'Delete' })
      .click();
  }

  async clickSortByFirstName() {
    await this.sortByFirstNameLink.click();
  }

  async getFirstNames() {
    return (await this.firstNameCells.allTextContents()).map((t) => t.trim());
  }

  // Returns 'asc', 'desc' or 'none' for the currently displayed first names.
  async getFirstNamesSortOrder() {
    const names = await this.getFirstNames();
    const asc = [...names].sort((a, b) => a.localeCompare(b));
    const desc = [...asc].reverse();
    if (JSON.stringify(names) === JSON.stringify(asc)) return 'asc';
    if (JSON.stringify(names) === JSON.stringify(desc)) return 'desc';
    return 'none';
  }

  async assertSearchInputIsVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async assertRowsCount(count) {
    await expect(this.rows).toHaveCount(count);
  }

  async assertCustomerIsVisible(firstName, lastName) {
    await expect(this.rowByName(firstName, lastName)).toHaveCount(1);
  }

  async assertCustomerIsNotVisible(firstName, lastName) {
    await expect(this.rowByName(firstName, lastName)).toHaveCount(0);
  }

  async assertCustomerPostCode(firstName, lastName, postCode) {
    await expect(
      this.rowByName(firstName, lastName).locator('td').nth(2)
    ).toHaveText(postCode);
  }

  async assertCustomerHasAccount(firstName, lastName, accountNumber) {
    await expect(
      this.rowByName(firstName, lastName).locator('td').nth(3)
    ).toContainText(accountNumber);
  }

  async assertCustomerHasNoAccounts(firstName, lastName) {
    await expect(
      this.rowByName(firstName, lastName).locator('td').nth(3)
    ).toHaveText('');
  }

  async assertFirstNamesAre(expectedNames) {
    expect((await this.getFirstNames()).sort()).toEqual([...expectedNames].sort());
  }
}