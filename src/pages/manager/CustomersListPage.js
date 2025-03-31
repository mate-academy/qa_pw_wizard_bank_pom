const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.lastAddedCustomerRow = page.getByRole('row').last();
    this.lastAddedCustomerFirstName = this.lastAddedCustomerRow.getByRole('cell').nth(0);
    this.lastAddedCustomerLastName = this.lastAddedCustomerRow.getByRole('cell').nth(1);
    this.lastAddedCustomerPostCode = this.lastAddedCustomerRow.getByRole('cell').nth(2);
    this.lastAddedCustomerAccountNumber = this.lastAddedCustomerRow.getByRole('cell').nth(3);
    this.lastAddedCustomerDeleteButton = this.lastAddedCustomerRow.getByRole('button', { name: 'Delete' });
    this.searchField = page.getByPlaceholder('Search Customer');
    this.secondTableRow = page.getByRole('row').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForPageLoad() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list')
  }

  async clickLastAddedCustomerDeleteButton() {
    await this.lastAddedCustomerDeleteButton.click();
  }

  async fillTheSearchField(searchName) {
    await this.searchField.fill(searchName);
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

  async assertLastAddedCustomerAccountNumberIsNotEmpty() {
    await expect(this.lastAddedCustomerAccountNumber).not.toEqual('');
  }

  async assertCustomerRowIsNotVisible(firstName, lastName, postCode) {
    this.customerRowLocator = this.page.getByRole('row', { name: `${firstName} ${lastName} ${postCode}` });
    await expect(this.customerRowLocator).toBeHidden();
  }

  async assertCustomerRowIsVisible(firstName, lastName, postCode) {
    this.customerRowLocator = this.page.getByRole('row', { name: `${firstName} ${lastName} ${postCode}` });
    await expect(this.customerRowLocator).toBeVisible();
  }

  async assertNoOtherRowsArePresent() {
    await expect(this.secondTableRow).toBeHidden();  
  }
}