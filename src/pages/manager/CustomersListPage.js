import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerField = page.getByPlaceholder('Search Customer')
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async deleteCustomerByName(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    const row = this.page.locator('tr', { hasText: fullName });
    const deleteButton = row.getByRole('button', { name: 'Delete' });
    await deleteButton.click();
  }

  async assertCustomerIsNotVisible(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    const row = this.page.locator('tr', { hasText: fullName });
    await expect(row).toHaveCount(0);
  }

  async fillCertainValueInSearchField(value) {
    await this.searchCustomerField.fill(value);
  }

  async assertCustomerRowIsPresentInTable(firstName, lastName, postalCode) {
    const fullCostomerInfo = `${firstName} ${lastName} ${postalCode}`
    const row = this.page.locator('tr', { hasText: fullCostomerInfo });
    await expect(row).toHaveCount(1);
  }

  async assertNoOtherRowsIsPresentInTable() {
    const rows = this.page.locator('tbody tr');
    await expect(rows).toHaveCount(1);
  }
}
