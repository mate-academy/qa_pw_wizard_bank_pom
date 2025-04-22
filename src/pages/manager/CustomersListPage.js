const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerRow = page.locator('tbody > tr');
    this.customerRowDeleteButton = this
      .customerRow.getByRole('button');
    this.searchField = page
      .getByPlaceholder('Search Customer');
    this.searchResultFirstRow = page
      .locator('tbody > tr').nth(0);
    this.searchResultSecondRow = page
      .locator('tbody > tr').nth(1);
    this.firstNameInLastCell = page
      .locator('tbody > tr:last-child td:first-child');
    this.lastNameInLastCell = page
      .locator('tbody > tr:last-child td:nth-child(2)');
    this.accountNumberCell = page
      .locator('tbody > tr:last-child td:nth-child(4)');
  }

  async open() {
    await this.page
    .goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async waitForTableLoad() {
    await this.page.waitForSelector('tbody');
  }
  async deleteCustomer(firstName, lastName, postCode) {
    await this.customerRow
    .filter({ hasText: `${firstName} ${lastName} ${postCode}` })    
    .getByRole('button', { name: 'Delete' }).click();
  }
  async assertCustomerIsNotVisible(firstName, lastName, postCode) {
    await expect(this.customerRow
      .filter({ hasText: `${firstName} ${lastName} ${postCode}` }))
      .toBeHidden();
  }
  async reloadPage() {
    await this.page.reload();
  }
  async fillSearchFieldByUsername(userName) {
    await this.searchField.fill(userName);
  }
  async fillSearchFieldByLastname(lastName) {
    await this.searchField.fill(lastName);
  }
  async fillSearchFieldByPostalCode(postalCode) {
    await this.searchField.fill(postalCode);
  }
  async assertCostomerInSearchResult(firstName, lastName, postCode) {
    await expect(this.searchResultFirstRow
      .filter({ hasText: `${firstName} ${lastName} ${postCode}` }))
      .toBeVisible();
  }
  async assertOtherRowsAreNotVisible(){
    expect(this.searchResultSecondRow)
      .toBeHidden();
  }
  async assertFirstNameInLastCell(firstName) {
    expect(this.firstNameInLastCell).toHaveText(firstName);
  }
  async assertLastNameInLastCell(lastName) {
    expect(this.lastNameInLastCell).toHaveText(lastName);
  }
  async assertAccountNumberCellIsEmpty() {
    expect(this.accountNumberCell).toBeEmpty();
  }
    
}