import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    const getRaw = page.locator('tr').last();
    
    this.customerAccountNumber = getRaw.getByRole('cell').nth(3);
    this.placeholderSearchCustomer = page.getByPlaceholder('Search Customer');
    const findRow = page.getByRole('table');
    this.customerSearchRow = findRow.getByRole('row').nth(1);
    this.customerSearchRowNext = findRow.getByRole('row').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertDeletedCustomerRaw() {
    await expect(this.customerAccountNumber).not.toHaveText('');
  }

  async fillPlaceholderSearchCustomer(text) {
    await this.placeholderSearchCustomer.fill(text);
  }

  async assertCustomerSearchRaw() {
    await expect(this.customerSearchRow).toBeVisible();
  }

  async assertNextRowNotExist() {
    await expect(this.customerSearchRowNext).not.toBe();
  }

}
