const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.lastAddedCustomerRow = page.getByRole('row').last();
    this.lastAddedCustomerFirstName = this.lastAddedCustomerRow.getByRole('cell').nth(0);
    this.lastAddedCustomerLastName = this.lastAddedCustomerRow.getByRole('cell').nth(1);
    this.lastAddedCustomerPostCode = this.lastAddedCustomerRow.getByRole('cell').nth(2);
    this.lastAddedCustomerAccountNumber = this.lastAddedCustomerRow.getByRole('cell').nth(3);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForPageLoad() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list')
  }

  async assertLastAddedCustomerFirstName(firstName) {
    await expect(this.lastAddedCustomerFirstName).toContainText(firstName);
  }

  async assertLastAddedCustomerLastName(lastName) {
    await expect(this.lastAddedCustomerLastName).toContainText(lastName);
  }

  async assertLastAddedCustomerPostCode(postCode) {
    await expect(this.lastAddedCustomerPostCode).toContainText(postCode);
  }

  async assertLastAddedCustomerAccountNumberIsAbsent() {
    await expect(this.lastAddedCustomerAccountNumber).toContainText('');
  }

}