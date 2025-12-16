import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableOfCustomers = page.getByRole('table');
    this.lastRow = this.tableOfCustomers.getByRole('row').last();
    this.accountNumberCell = this.lastRow.getByRole('cell').nth(3);
    this.deleteCustomerCell = this.lastRow.getByRole('cell').nth(4);
    this.deleteCustomerButton = this.deleteCustomerCell.getByRole('button');
    this.searchField = page.getByPlaceholder('Search Customer');
    this.secondRow = this.tableOfCustomers.getByRole('row').nth(1);
    this.firstNameSellInSecondRow = this.secondRow.getByRole('cell').nth(0);
    this.lastNameSellInSecondRow = this.secondRow.getByRole('cell').nth(1);
    this.postalCodeSellInSecondRow = this.secondRow.getByRole('cell').nth(2);
    this.thirdRow = this.tableOfCustomers.getByRole('row').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickDeleteCustomerButton() {
    await this.deleteCustomerButton.click();
  }

  async lastRowNotVisible(text) {
    await expect(this.lastRow).not.toContainText(text);
  }

  async waitForLoading() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async checkAccountNumberCellNotEmpty() {
    await expect(this.accountNumberCell).not.toBeEmpty();
  }

  async fillSearchField(firstName) {
    await this.searchField.fill(firstName);
  }

  async tableContainsTheCustomer(firstName) {
    await expect(this.tableOfCustomers).toHaveText(firstName);
  }

  async secondRowContainsTheName(firstName) {
    await expect(this.firstNameSellInSecondRow).toContainText(firstName);
  }

  async secondRowContainsTheLastName(lastName) {
    await expect(this.lastNameSellInSecondRow).toContainText(lastName);
  }

  async secondRowContainsPostalCode(postalCode) {
    await expect(this.postalCodeSellInSecondRow).toContainText(postalCode);
  }

  async thirdRowIsNotVisible() {
    await expect(this.thirdRow).not.toBeVisible();
  }
}
