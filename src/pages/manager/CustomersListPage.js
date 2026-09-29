import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.tableRows = page.locator('table tbody tr');
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
  }

  async searchCustomer(searchValue) {
    await this.searchInput.fill(searchValue);
  }

  async assertCustomerInTable(firstName, lastName) {
    const row = this.tableRows.filter({ hasText: `${firstName} ${lastName}` });
    await expect(row).toBeVisible();
  }

  async deleteCustomer(firstName) {
    const row = this.tableRows.filter({ hasText: firstName });
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerNotInTable(firstName) {
    const row = this.tableRows.filter({ hasText: firstName });
    await expect(row).toHaveCount(0);
  }
}