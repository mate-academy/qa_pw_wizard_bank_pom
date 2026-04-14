import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableRows = page.getByRole('row');
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
    
  }

  async searchCustomerByFirstName(firstName) {
    await this.searchCustomerField.fill(firstName);
  }

  async searchCustomerByLastName(lastName) {
    await this.searchCustomerField.fill(lastName);
  }

   async searchCustomerByPostCode(postCode) {
    await this.searchCustomerField.fill(postCode);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async getLastRowAccountNumber() {
    const lastRow = this.tableRows.last();
    return await lastRow.locator('td').nth(3).innerText();
}

  async deleteLastCustomer() {
    const lastRow = this.tableRows.last();
    await lastRow.getByRole('button', {name: 'Delete'}).click();
  }

  async reloadPage() {
      await this.page.reload();
  }
}