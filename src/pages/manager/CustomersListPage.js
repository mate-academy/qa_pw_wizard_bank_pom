import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastrow = page.locator('table tbody tr').last()
    this.lastRowAccountNumber = this.lastrow.locator('td').nth(3);
    this.searchField = page.getByRole('textbox',{ name: 'Search Customer'});
    
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async deleteCustomer(firstName) {
    await this.page.locator('tbody tr').filter
     ({hasText: firstName }).getByRole('button', {name: 'delete'}).click()
  }
 getCustomerRow(firstName) {
     return this.page.locator('tbody tr').filter({hasText: firstName })
    
  }

  async search(value) {
  await this.searchField.fill(value);
  }
}


