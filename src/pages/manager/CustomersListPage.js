const { expect } = require('@playwright/test');

class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerRows = page.locator('tbody tr');
    this.searchInput = page.locator('input[placeholder="Search Customer"]');
    this.deleteButtons = page.locator('button[ng-click="deleteCust(cust)"]');
  }

  async searchCustomer(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.page.waitForTimeout(500);
  }

  async deleteCustomer(customerName) {
    const row = this.customerRows.filter({ hasText: customerName });
    await row.locator('button[ng-click="deleteCust(cust)"]').first().click();
    await this.page.waitForTimeout(1000); // Чекаємо оновлення таблиці
  }

  async getCustomerRow(customerName) {
    return this.customerRows.filter({ hasText: customerName });
  }
}

module.exports = { CustomersListPage };