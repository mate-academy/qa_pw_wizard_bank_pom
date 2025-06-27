import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerField = page.getByPlaceholder('Search Customer');

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  getLastCustomerRow() {
    return this.page.locator('table tbody tr').last();
  }

  async assertLastCustomerData({ firstName, lastName, postCode }) {
    const lastRow = this.getLastCustomerRow();

    await expect(lastRow.getByRole('cell').nth(0)).toHaveText(firstName);
    await expect(lastRow.getByRole('cell').nth(1)).toHaveText(lastName);
    await expect(lastRow.getByRole('cell').nth(2)).toHaveText(postCode);
    await expect(lastRow.getByRole('cell').nth(3)).toBeEmpty(); // No account number yet
  }

  
  getCustomerRow(firstName, lastName) {
    return this.page.locator('tr', {
      hasText: `${firstName} ${lastName}`
    });
  }

  async deleteCustomerByName(firstName, lastName) {
    const row = this.getCustomerRow(firstName, lastName);
    await row.locator('button:has-text("Delete")').click();
  }
  
  async assertCustomerRowIsNotPresent(firstName, lastName) {
    await expect(this.getCustomerRow(firstName, lastName)).toHaveCount(0);
  }

  async assertLastCustomerAccountNumberNotEmpty() {
    const lastRow = this.getLastCustomerRow();

    await expect(lastRow.getByRole('cell').nth(3)).not.toBeEmpty(); 
  }

  async fillCustomerNameInSearchField(firstName) {
    await this.searchCustomerField.fill(firstName);
  }

  getCustomerRowByFirstName(firstName) {
    return this.page.locator('tr', {
      hasText: `${firstName}`
    });
  }

  async assertCustomerRowWithName(firstName) {
    await expect(this.getCustomerRowByFirstName(firstName)).toBeVisible();
  }

  async assertOnlyOneCustomerRowVisible() {
    const rows = this.page.locator('table tbody tr');
    await expect(rows).toHaveCount(1);
  }
}
