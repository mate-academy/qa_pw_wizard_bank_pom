import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.rows = page.locator('table tbody tr');
    this.lastRow = this.rows.last();
    this.firstNameCell = this.lastRow.getByRole('cell').nth(0);
    this.lastNameCell = this.lastRow.getByRole('cell').nth(1);
    this.postCodeCell = this.lastRow.getByRole('cell').nth(2);
    this.accountNumberCell = this.lastRow.getByRole('cell').nth(3);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }

  async searchCustomer(value) {
    await this.searchInput.fill(value);
  }

  async assertLastRowContainsCustomer(firstName, lastName, postCode) {
    await expect(this.firstNameCell).toContainText(firstName);
    await expect(this.lastNameCell).toContainText(lastName);
    await expect(this.postCodeCell).toContainText(postCode);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.accountNumberCell).toHaveText('');
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.accountNumberCell).not.toHaveText('');
  }

  async assertCustomerNotPresent(firstName, lastName) {
    const row = this.rows
      .filter({ hasText: firstName })
      .filter({ hasText: lastName });
    await expect(row).toHaveCount(0);
  }

  async deleteCustomer(firstName, lastName) {
    const row = this.rows
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .first();
    await expect(row).toHaveCount(1);
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async assertOnlyOneRowAndContains(firstName, lastName, postCode) {
    await expect(this.rows).toHaveCount(1);
    const row = this.rows.first();
    await expect(row).toContainText(firstName);
    await expect(row).toContainText(lastName);
    await expect(row).toContainText(postCode);
  }
}
