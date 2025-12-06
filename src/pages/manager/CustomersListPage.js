import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.searchInput = page.locator('input[ng-model="searchCustomer"]');
    this.customerRows = page.locator('table tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async searchCustomerByFirstName(firstName) {
    await this.searchInput.fill(firstName);
  }

  async searchCustomerByLastName(lastName) {
    await this.searchInput.fill(lastName);
  }

  async searchCustomerByPostalCode(postalCode) {
    await this.searchInput.fill(postalCode);
  }

  async deleteCustomerByName(firstName, lastName) {
    const row = this.customerRows
      .filter({ hasText: `${firstName} ${lastName}` })
      .first();

    const deleteButton = row.locator('button[ng-click="deleteCust(cust)"]');

    await deleteButton.click();
    await expect(row).toHaveCount(0); 
  }

  async assertCustomerRowPresent(firstName, lastName) {
    const row = this.customerRows.filter({
      hasText: `${firstName} ${lastName}`,
    });
    await expect(row).toHaveCount(1);
  }

  async assertCustomerRowNotPresent(firstName, lastName) {
    const row = this.customerRows.filter({
      hasText: `${firstName} ${lastName}`,
    });
    await expect(row).toHaveCount(0);
  }

  async assertOnlyOneRowPresent() {
    await expect(this.customerRows).toHaveCount(1);
  }

  async assertLastRowContains(text) {
    const lastRow = this.customerRows.last();
    await expect(lastRow).toContainText(text);
  }

  async assertLastRowNoAccountNumber() {
    const lastRow = this.customerRows.last();
    const accountNumberCell = lastRow.locator('td:nth-child(4)');
    await expect(accountNumberCell).toHaveText('');
  }
}


