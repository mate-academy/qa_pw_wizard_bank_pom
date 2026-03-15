import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

 
 async clickDeleteButton(customerName) {
  await this.page.locator('tr', { hasText: customerName })
    .getByRole('button', { name: 'Delete' })
    .click();
}

 async searchCustomer(name) {
  await this.page.getByPlaceholder('Search Customer').fill(name);
}
}
