const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.lastAddedUserRow = page.getByRole('row').last();
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }

  async assertAddedUserNameToBeVisible(firstName) {
    await expect(this.lastAddedUserRow.getByText(firstName)).toBeVisible();
  }
  
  async assertAddedUserLastNameToBeVisible(lastName) {
    await expect(this.lastAddedUserRow.getByText(lastName)).toBeVisible();
  }

  async assertAddedUserPostCodeToBeVisible(postCode) {
    await expect(this.lastAddedUserRow.getByText(postCode)).toBeVisible();
  }

  async assertNoAccountNumber() {
    await expect(this.lastAddedUserRow.getByRole('cell').nth(3)).toBeEmpty();
  }

  async clickDeleteUserButton(fullName) {
    await this.page.getByRole('row', { name: fullName }).getByRole('button').click();
  }

  async assertCustomerRowIsNotVisible(fullName) {
    await expect(this.page.getByRole('row', { name: fullName })).toBeHidden();
  }

  async assertAccountNumberNotEmpty() {
    await expect(this.lastAddedUserRow.getByRole('cell').nth(3)).not.toBeEmpty();
  }

  async fillSearchCustomerField(search) {
    await this.searchCustomerField.fill(search);
  }

  async assertCustomerRowIsVisible(fullName) {
    await expect(this.page.getByRole('row', { name: fullName })).toBeVisible();
  }

  async assertThatOnlyOneRowIsVisible() {
    await expect(this.page.locator('tbody tr')).toHaveCount(1);
  }
}