import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerRows = page.locator('tbody').getByRole('row');
    this.searchField = page.getByRole('textbox', { name: 'Search Customer' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }

  async getLastRow () {
    return this.customerRows.last();
  }

  async assertLastRowToContainFirstName(text) {
    const lastRow = await this.getLastRow();
    await expect(lastRow.locator('td').nth(0)).toContainText(text);
  }

  async assertLastRowToContainLastName(text) {
    const lastRow = await this.getLastRow();
    await expect(lastRow.locator('td').nth(1)).toContainText(text);
  }

  async assertLastRowToContainPostalCode(text) {
    const lastRow = await this.getLastRow();
    await expect(lastRow.locator('td').nth(2)).toContainText(text);
  }

  async assertLastRowHasNoAccountNumber() {
    const lastRow = await this.getLastRow();
    await expect(lastRow.locator('td').nth(3)).toHaveText('');
  }

  async assertLastRowHasAccountNumber(firstName, lastName, postalCode) {
  const customerRow = this.customerRows
    .filter({ hasText: firstName })
    .filter({ hasText: lastName })
    .filter({ hasText: postalCode });
  await expect(customerRow.locator('td').nth(3)).not.toBeEmpty();
}

  async deleteCustomerRow() {
    const lastRow = await this.getLastRow();
    const deleteButton = lastRow.getByRole('button', { name: 'Delete' });
    await deleteButton.click();
  }

  async assertCustomerRowNotPresent(firstName, lastName, postalCode) {
    const customerRow = this.customerRows.filter({ hasText: firstName})
      .filter({ hasText: lastName})
      .filter({ hasText: postalCode});
    await expect(customerRow).toHaveCount(0);
  }

  async searchCustomer(firstName) {
    await this.searchField.fill(firstName);
  }

  async assertCustomerRowPresent(firstName, lastName, postalCode) {
    const customerRow = this.customerRows.filter({ hasText: firstName})
      .filter({ hasText: lastName})
      .filter({ hasText: postalCode});
    await expect(customerRow).toHaveCount(1);
  }

  async assertOnlyOneRowPresent() {
    await expect(this.customerRows).toHaveCount(1);
  }
}
