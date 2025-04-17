const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.addCustomerButton = page.getByRole('button', { name: /Add Customer/i }).nth(0);
    this.openAccountButton = page.getByRole('button', { name: /Open Account/i }).nth(0);
    this.customersButton = page.getByRole('button', { name: /Customers/i }).nth(0);
    this.searchField = page.getByPlaceholder('Search Customer');
    const lastRow = page.getByRole('row').last();
    this.lRowFNameCell = lastRow.getByRole('cell').nth(0);
    this.lRowLNameCell = lastRow.getByRole('cell').nth(1);
    this.lRowPCodeCell = lastRow.getByRole('cell').nth(2);
    this.lRowANumberCell = lastRow.getByRole('cell').nth(3);
    this.lRowDeleteButtonCell = lastRow.getByRole('cell').nth(4).getByRole('button', { name: /Delete/i });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }

  async waitForOpen() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async fillSearchField(text) {
    await this.searchField.fill(text);
  }

  async clickDeleteButton() {
    await this.lRowDeleteButtonCell.click();
  }

  async assertFirstNameFieldHaveText(fName) {
    await expect(this.lRowFNameCell).toHaveText(fName);
  }

  async assertLastNameFieldHaveText(lName) {
    await expect(this.lRowLNameCell).toHaveText(lName);
  }

  async assertPostCodeFieldHaveText(pCode) {
    await expect(this.lRowPCodeCell).toHaveText(pCode);
  }

  async assertAccountNumberFieldIsEmpty() {
    await expect(this.lRowANumberCell).toBeEmpty();
  }

  async assertAccountNumberFieldIsNotEmpty() {
    await expect(this.lRowANumberCell).not.toBeEmpty();
  }

  async assertCustomersCount(cCount) {
    const rowCount = await this.page.getByRole('row').count();
    expect(rowCount).toBe(cCount);
  }

  async assertRowIsVisible() {
    await expect(this.page.getByRole('row').nth(1)).toBeVisible();
  }

  async assertRowIsHidden() {
    await expect(this.page.getByRole('row').nth(1)).toBeHidden();
  }
}