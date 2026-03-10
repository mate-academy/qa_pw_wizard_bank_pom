import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchField = page.getByPlaceholder('Search Customer');
    this.customerRow = page.locator('tbody').locator('tr').nth(0);
    this.anotherRow = page.locator('tbody').locator('tr').nth(1);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async fillSearchField(firstName){
    await this.searchField.fill(firstName);
  }
}
