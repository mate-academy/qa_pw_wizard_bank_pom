import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator('tbody tr');
    this.search = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertCustomerInLastRow(firstName, lastName, postCode) {
    const lastRow = this.rows.last();

    await expect(lastRow.locator('td').nth(0)).toContainText(firstName);
    await expect(lastRow.locator('td').nth(1)).toContainText(lastName);
    await expect(lastRow.locator('td').nth(2)).toContainText(postCode);
    await expect(lastRow.locator('td').nth(3)).toContainText('');
  }

  async deleteCustomerByFirstName(firstName) {
    const customerRow = this.rows.filter({ hasText: firstName });

    await customerRow.getByRole('button', { name: 'Delete' }).click();

    await this.page.reload();

    await expect(this.rows.filter({ hasText: firstName })).toHaveCount(0);
  }

  async assertLastCustomerHasAccountNumber() {
      const lastRow = this.rows.last();
      const accountNumber = lastRow.locator('td').nth(3);
      await expect(accountNumber).not.toHaveText('');
  }

    async searchCustomerByFirstName(firstName) {
    await this.search.fill(firstName);
  }

  async searchCustomerByLastName(lastName) {
    await this.search.fill(lastName);
  }

  async searchCustomerByPostalCode(postalCode) {
    await this.search.fill(postalCode);
  }

  async assertSearchResultHasSingleRowWithText(text) {
    const matchingRows = this.rows.filter({ hasText: text });
    await expect(matchingRows).toHaveCount(1);
    await expect(matchingRows.first()).toBeVisible();
  }
}
