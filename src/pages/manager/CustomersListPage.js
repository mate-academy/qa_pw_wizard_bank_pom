const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.lastRowLocator = page.getByRole('row').last();
    this.firstNamaCellLocator = this.lastRowLocator.getByRole('cell').nth(0);
    this.lastNameCellLocator = this.lastRowLocator.getByRole('cell').nth(1);
    this.postCodeCellLocator = this.lastRowLocator.getByRole('cell').nth(2);
    this.accountNumberCellLocator = this.lastRowLocator.getByRole('cell').nth(3);
    this.deleteCustomerButtonLocator = this.lastRowLocator.getByRole('button', { name: 'Delete'});
    this.deletedRowLocator = page.getByRole('row').nth(6);
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
    this.customerSearchRowLocator = page.getByRole('row').last();
    this.tableBodyRowsLocator = page.locator('tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }

  async fillSearchField(text) {
    await this.searchCustomerField.fill(text);
  }

  async assertFirstNameCellContainsText(firstName) {
    await expect(this.firstNamaCellLocator).toContainText(firstName);
  }

  async assertLastNameCellContainsText(lastName) {
    await expect(this.lastNameCellLocator).toContainText(lastName);
  }

  async assertPostCodeCellContainsText(postCode) {
    await expect(this.postCodeCellLocator).toContainText(postCode);
  }

  async assertAccountNumberIsEmpty() {
    await expect(this.accountNumberCellLocator).toHaveText('');
  }

  async assertAccountNumberIsNotEmpty() {
    await expect(this.accountNumberCellLocator).not.toHaveText('');
  }

  async clickDeleteCustomerButton() {
    await this.deleteCustomerButtonLocator.click();
  }

  async assertDeletedRowIsHidden() {
    await expect(this.deletedRowLocator).toBeHidden();
  }

  async assertCustomerSerchRowIsVisible() {
    await expect(this.customerSearchRowLocator).toBeVisible();
  }

  async assertOtherRowsIsNotVisible() {
    await expect(this.tableBodyRowsLocator).toHaveCount(1);
  }
}
