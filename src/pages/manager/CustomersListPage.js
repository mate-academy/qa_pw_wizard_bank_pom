import { expect } from '@playwright/test';
import { BasePage } from '../../BasePage.js';

export class CustomersListPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('input[placeholder="Search Customer"]');
    this.customerRows = page.locator('table tbody tr');
  }

  async searchCustomer(term) {
    await this.searchInput.fill(term);
  }

  async assertOnlyOneResult() {
    await expect(this.customerRows).toHaveCount(1);
  }

  async getCustomerRowData() {
    const cells = await this.customerRows.first().locator('td').allTextContents();
    return cells.map((text) => text.trim());
  }

  async deleteCustomerByName(name) {
    const row = this.page.locator('table tbody tr', { hasText: name });
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerExists(name) {
    await expect(this.page.locator('table tbody tr', { hasText: name })).toBeVisible();
  }
}
