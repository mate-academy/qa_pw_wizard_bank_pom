import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.deleteLastCustomerButton = page.locator('tbody tr').last().locator('button').first();
    this.lastCustomerRow = page.locator('tbody tr').last();
    this.searchField = page.getByPlaceholder('Search Customer');
    this.customerRow = page.locator('tbody tr');
  }

  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/manager/list');
  }
}
