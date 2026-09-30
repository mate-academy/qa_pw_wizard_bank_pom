import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerRows = page.locator('table tbody tr');
    this.searchInput = page.locator('input[ng-model="searchCustomer"]');
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async searchCustomer(value) {
    await this.searchInput.fill(value);
  }

  rowForCustomer(firstName, lastName) {
    return this.customerRows.filter({
      hasText: `${firstName} ${lastName}`,
    });
  }

  lastRow() {
    return this.customerRows.last();
  }

  async assertLastRowContainsText(text) {
    await expect(this.lastRow()).toContainText(text);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRow().getByRole('cell').nth(3)).toHaveText('');
  }

  async clickDeleteForCustomer(firstName, lastName) {
    await this.rowForCustomer(firstName, lastName)
      .getByRole('button', { name: 'Delete' })
      .click();
  }

  async assertCustomerIsVisible(firstName, lastName) {
    await expect(this.rowForCustomer(firstName, lastName)).toBeVisible();
  }

  async assertCustomerIsHidden(firstName, lastName) {
    await expect(this.rowForCustomer(firstName, lastName)).toBeHidden();
  }

  async assertOnlyCustomerIsVisible(firstName, lastName) {
    await expect(this.customerRows).toHaveCount(1);
    await this.assertCustomerIsVisible(firstName, lastName);
  }

  async assertLastRowAccountNumberIsPresent() {
    await expect(this.lastRow().getByRole('cell').nth(3)).toHaveText(/\d+/);
  }
}
