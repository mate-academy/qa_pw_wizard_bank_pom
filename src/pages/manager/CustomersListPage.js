import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.url = 'angularJs-protractor/BankingProject/#/manager/list';
    this.searchField= this.page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload(){
    await this.page.reload();
  }

  async awaitPageLoad() {
    await this.page.waitForURL(this.url);
  }

  async getLastCustomerRow() {
    return this.page.locator("tbody tr").last();
  }

  async assureRowHasFirstName(row, firstName) {
    await expect(row.locator("td").first()).toContainText(firstName);
  }

  async assureRowHasLastName(row, lastName) {
    await expect(row.locator("td").nth(1)).toContainText(lastName);
  }

  async assureRowHasPostalCode(row, postalCode) {
    await expect(row.locator("td").nth(2)).toContainText(postalCode);
  }

  async assureUserHasNoAccountNumber(row) {
    await expect(row.locator("td").nth(3)).toBeEmpty();
  }

  async assureUserHasAccountNumber(row) {
    await expect(row.locator("td").nth(3)).not.toBeEmpty();
  }

  async deleteLastCustomer() {
    const lastRow = await this.getLastCustomerRow();
    await lastRow.getByRole('button', {name: "Delete"}).click();
  }
 
  async assureCustomerAbsent(lastName) {
    await expect(this.page.locator('tbody tr', { hasText: lastName })).toBeHidden();
  }

  async assureCustomerExists(firstName) {
    await expect(this.page.locator('tbody tr', { hasText: firstName })).toBeVisible();
  }

  async searchInSearchField(value) {
    await this.searchField.fill(value);
  }

  async assureCustomersCount(count) {
    await expect(this.page.locator('tbody tr')).toHaveCount(count);
  }
}
