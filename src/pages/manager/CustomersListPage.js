const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.firstNameNewCustumer = page.getByRole('row').last().getByRole('cell').first();
    this.lastNameNewCustumer = page.getByRole('row').last().getByRole('cell').nth(1);
    this.postCodeNewCustumer = page.getByRole('row').last().getByRole('cell').nth(2);
    this.accountNumberNewCustumer = page.getByRole('row').last().getByRole('cell').nth(3);
    this.deleteButtonNewUser = page.getByRole('row').last().getByRole('cell').nth(4).getByRole('button');
    this.rowNewUser = page.getByRole('row').last();
    this.searchRow = page.getByPlaceholder('Search Customer');
    this.rowOfReturnedUser = page.getByRole('row').nth(1);
    this.rowAbsented = page.getByRole('row').nth(2);
  }

  async assertAnotherRowAbsented() {
    expect(this.rowAbsented).toBeHidden();
  }

  async assertCoctumerRowDisplayed(text) {
    expect(this.rowOfReturnedUser).toContainText(text);
  }

  async searchRowFill(text) {
    await this.searchRow.fill(text);
  }

  async clickDeleteButtonNewUser() {
    await this.deleteButtonNewUser.click();
  }

  async assertFirstNameNewUser(text) {
    expect(this.firstNameNewCustumer).toHaveText(text);
  }

  async assertLastNameNewUser(text) {
    expect(this.lastNameNewCustumer).toHaveText(text);
  }

  async assertPostCodeNewUser(text) {
    expect(this.postCodeNewCustumer).toHaveText(text);
  }

  async assertAccountNumberNewUser() {
    expect(this.accountNumberNewCustumer).toBeEmpty();
  }

  async assertIsPresentAccountNumberNewUser() {
    expect(this.accountNumberNewCustumer).not.toBeEmpty();
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
}