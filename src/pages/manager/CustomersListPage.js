import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastCustomerRow = page.locator('table tbody tr').last();
    this.searchInput = page.getByPlaceholder('Search Customer');
  }

  async assertLastCustomerFirstName(firstName) {
    await expect(this.lastCustomerRow.locator('td').nth(0)).toHaveText(firstName);
  }
  async searchCustomerFirstName(firstName) {
    await this.searchInput.fill(firstName);
  }
  async searchCustomerLastName(lastName) {
    await this.searchInput.fill(lastName);
  }
  async searchCustomerPostCode(postCode) {
    await this.searchInput.fill(postCode);
  }
  async assertOnlyOneCustomerRowIsPresent() {
   await expect(this.page.locator('table tbody tr')).toHaveCount(1);
  }
  async assertLastCustomerLastName(lastName) {
    await expect(this.lastCustomerRow.locator('td').nth(1)).toHaveText(lastName);
  }
  async assertLastCustomerPostCode(postCode) {
    await expect(this.lastCustomerRow.locator('td').nth(2)).toHaveText(postCode);
  }
  async assertLastCustomerHasNoAccountNumber() {
    await expect(this.lastCustomerRow.locator('td').nth(3)).toBeEmpty();
  }
  async clickDeleteButtonForLastCustomer() {
    await this.lastCustomerRow.locator('td').locator('button').last().click();
  }
  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async assertCustomerIsNotPresent(firstName) {
    await expect(
    this.page.locator('tbody tr').filter({ hasText: firstName })
  ).not.toBeVisible();
  }
  async assertLastCustomerAccountNumberIsNotEmpty() {
    await expect(
      this.lastCustomerRow.locator('td').nth(3)
    ).not.toBeEmpty();
  }
  async reloadPage() {
    await this.page.reload();
  }
}
