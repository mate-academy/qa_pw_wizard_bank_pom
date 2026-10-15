import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.table = page.getByRole('table');
    this.tableRowsCount = this.table.locator('tbody tr');
    this.lastCreatedCustomer = this.table.locator('tr').last();
    this.lastCustomerFirstname = this.lastCreatedCustomer.locator('td').nth(0);
    this.lastCustomerLastName = this.lastCreatedCustomer.locator('td').nth(1);
    this.lastCustomerZipCode = this.lastCreatedCustomer.locator('td').nth(2);
    this.lastCustomerAccNum = this.lastCreatedCustomer.locator('td').nth(3);
    this.lastCustomerDeleteButton = this.lastCreatedCustomer.locator('button', { name : 'Delete'});
    this.searchCustomerField = page.getByPlaceholder('Search Customer');

  

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForCustomerListPage(){
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  getCreatedCustomerRow(firstName, lastName, zipCode) {
  return this.table
    .locator('tbody tr')
    .filter({ hasText: firstName })
    .filter({ hasText: lastName })
    .filter({ hasText: zipCode });
}

async assertNoOtherRowsPresented() {
  await expect(this.tableRowsCount).toHaveCount(1);
}


}
