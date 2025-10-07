import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableRows = page.locator('table tbody tr');
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reloadPage() {
    await this.page.reload();
  }

  async fillSearchField(input) {
    await this.searchField.fill(input);
  }

  async clickDeleteButtonForCustomer(firstName, lastName) {
    const customerRow = this.page.locator('table tbody tr', {
      hasText: firstName,
      hasText: lastName,
    });

    await customerRow.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerIsDeleted(firstName, lastName) {
    const customerRow = this.page.locator('table tbody tr', {
      hasText: firstName,
      hasText: lastName,
    });
    await expect(customerRow).toHaveCount(0);
  }

  async assertLastRowHasAccountNumber() {
    const lastRow = this.tableRows.last();
    const accountNumberCell = lastRow.locator('td').nth(3);
    await expect(accountNumberCell).not.toHaveText('');
  }

  async assertSearchResultContains(text) {
    await expect(this.tableRows).toHaveCount(1);
    const row = this.tableRows.first();
    await expect(row).toContainText(text);
  }



}
