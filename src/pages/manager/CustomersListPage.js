import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersTable = page.locator('table.table');
    this.searchField = page.getByPlaceholder('Search Customer');
    this.rows = this.page.locator('table.table tbody tr');
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  getCustomerRow(customerName) {
    return this.customersTable.getByRole('row').filter({
      hasText: customerName,
    });
  }
  getFirstName(name) {
    return this.getCustomerRow(name).getByRole('cell').nth(0);
  }

  getLastName(name) {
    return this.getCustomerRow(name).getByRole('cell').nth(1);
  }

  getPostCode(name) {
    return this.getCustomerRow(name).getByRole('cell').nth(2);
  }

  getAccountNumber(name) {
    return this.getCustomerRow(name).getByRole('cell').nth(3);
  }
  getDeleteButton(name) {
    return this.getCustomerRow(name).getByRole('button', { name: 'Delete' });
  }
  async assertCustomersTableIsVisible() {
    await expect(this.customersTable).toBeVisible();
  }
  async assertFirstName(name, firstName) {
    await expect(this.getFirstName(name)).toContainText(firstName);
  }
  async assertLastName(name, lastName) {
    await expect(this.getLastName(name)).toContainText(lastName);
  }
  async assertPostCode(name, postCode) {
    await expect(this.getPostCode(name)).toContainText(postCode);
  }
  async assertAccountNumber(name, accountNumber) {
    await expect(this.getAccountNumber(name)).toContainText(accountNumber);
  }
  async assertAccountNumberIsNotEmpty(name) {
    await expect(this.getAccountNumber(name)).not.toBeEmpty();
  }
  async fillSearchField(name) {
    await this.searchField.fill(name);
  }
  async assertCustomerRowIsPresent(name) {
    await expect(this.getCustomerRow(name)).toBeVisible();
  }
  async assertNumberOfRows(number) {
    await expect(this.rows).toHaveCount(number);
  }
  async deleteCustomer(name) {
    await this.getDeleteButton(name).click();
  }
  async assertCustomerRowIsNotPresent(name) {
    await expect(this.getCustomerRow(name)).not.toBeVisible();
  }
}
