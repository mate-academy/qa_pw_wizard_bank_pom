import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersTable = page.getByRole('table');
    this.lastRow = this.customersTable.getByRole('row').last();
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async assertLastRowContainsText(text) {
    await expect(this.lastRow).toContainText(text);
  }

  async deleteCustomer(customerName) {
    const customerRow = this.customersTable
      .getByRole('row')
      .filter({ hasText: customerName });

    await customerRow.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerIsNotPresent(customerName) {
    const customerRow = this.customersTable
      .getByRole('row')
      .filter({ hasText: customerName });

    await expect(customerRow).toBeHidden();
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    const accountNumberCell = this.lastRow.getByRole('cell').nth(3);

    await expect(accountNumberCell).not.toHaveText('');
  }

  async fillSearchField(firstName) {
    await this.searchField.fill(firstName);
  }

  async assertCustomerIsPresent(customerName) {
    const customerRow = this.customersTable
      .getByRole('row')
      .filter({ hasText: customerName });

    await expect(customerRow).toBeVisible();
  }

  async assertOnlyOneCustomerRowIsPresent() {
    const customerRows = this.customersTable.getByRole('row');

    await expect(customerRows).toHaveCount(2);
  }
}