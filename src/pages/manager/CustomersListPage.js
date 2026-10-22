import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.customerRows = page.locator('table tbody tr');
    this.lastCustomerRow = this.customerRows.last();
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/list',
    );
  }

  async searchCustomer(searchValue) {
    await this.searchInput.fill(searchValue);
  }

  async assertCustomerIsVisible(firstName, lastName, postalCode) {
    const customerRow = this.customerRows.filter({
      hasText: firstName,
    }).filter({
      hasText: lastName,
    }).filter({
      hasText: postalCode,
    });

    await expect(customerRow).toHaveCount(1);
  }

  async assertLastCustomerHasCorrectData(
    firstName,
    lastName,
    postalCode,
  ) {
    await expect(this.lastCustomerRow).toContainText(firstName);
    await expect(this.lastCustomerRow).toContainText(lastName);
    await expect(this.lastCustomerRow).toContainText(postalCode);
  }

  async assertLastCustomerHasNoAccountNumber() {
    const accountNumberCell = this.lastCustomerRow.getByRole('cell').nth(3);

    await expect(accountNumberCell).toBeEmpty();
  }

  async deleteCustomer(firstName, lastName) {
    const customerRow = this.customerRows.filter({
      hasText: firstName,
    }).filter({
      hasText: lastName,
    });

    await expect(customerRow).toHaveCount(1);

    await customerRow.getByRole('button', {
      name: 'Delete',
    }).click();
  }

  async assertCustomerIsNotVisible(firstName, lastName) {
    const customerRow = this.customerRows.filter({
      hasText: firstName,
    }).filter({
      hasText: lastName,
    });

    await expect(customerRow).toHaveCount(0);
  }

  async assertOnlyOneCustomerIsVisible() {
    await expect(this.customerRows).toHaveCount(1);
  }

  async assertLastCustomerHasAccountNumber() {
    const accountNumberCell = this.lastCustomerRow.getByRole('cell').nth(3);

    await expect(accountNumberCell).not.toBeEmpty();
  }
}