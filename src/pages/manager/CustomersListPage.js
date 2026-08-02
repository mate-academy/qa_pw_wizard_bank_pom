import { expect } from '@playwright/test';

export class CustomersListPage {
  
  constructor(page) {
    this.page = page;

    this.tableRows = page.locator('table tbody tr');
    this.lastRow = this.tableRows.last();
    this.lastRowFirstName = this.lastRow.locator('td').nth(0);
    this.lastRowLastName = this.lastRow.locator('td').nth(1);
    this.lastRowPostCode = this.lastRow.locator('td').nth(2);
    this.lastRowAccountNumber = this.lastRow.locator('td').nth(3);
    this.lastRowDeleteButton = this.lastRow.locator('td').nth(4).getByRole('button', { name: 'Delete' });
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForOpened() {
    await this.page.waitForURL(
      '/angularJs-protractor/BankingProject/#/manager/list',
    );
  }

   async assertLastRowFirstName(firstName) {
    await expect(this.lastRowFirstName).toHaveText(firstName);
  }

   async assertLastRowLastName(lastName) {
    await expect(this.lastRowLastName).toHaveText(lastName);
  }

   async assertLastRowPostCode(postCode) {
    await expect(this.lastRowPostCode).toHaveText(postCode);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumber).toBeEmpty();
  }

  
  async assertLastRowAccountNumberNotEmpty() {
    await expect(this.lastRowAccountNumber).not.toBeEmpty();
  }
  

  getRowByCustomerName(firstName, lastName) {
    return this.tableRows
      .filter({ hasText: firstName })
      .filter({ hasText: lastName });
  }

  async clickDeleteCustomer(firstName, lastName) {
    const row = this.getRowByCustomerName(firstName, lastName);
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerNotPresent(firstName, lastName) {
    const row = this.getRowByCustomerName(firstName, lastName);
    await expect(row).toHaveCount(0);
  }

  async assertCustomerRowPresent(firstName, lastName) {
  const row = this.getRowByCustomerName(firstName, lastName);
  await expect(row).toHaveCount(1);
}

  async assertNoOtherRowsPresent() {
  await expect(this.tableRows).toHaveCount(1);
}

  async search(input) {
    await this.searchField.fill(input);
  }

}
