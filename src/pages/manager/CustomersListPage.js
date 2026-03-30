import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersTableRows = page.locator('tr.ng-scope');
    this.deleteButtons = page.getByRole('button', { name : 'Delete'});
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  getLastRowCell (cellIndex) {
    return this.customersTableRows.last().locator('td').nth(cellIndex);
  }

  async lastDeleteButtonClick () {
    await this.deleteButtons.last().click();
  }

  async searchCustomer (name) {
    await this.searchCustomerField.fill(name);
  }
}
