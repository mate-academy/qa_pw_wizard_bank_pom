import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.tableRows = page.locator('tr.ng-scope');
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async deleteLastCustomer() {
    await this.deleteButton.last().click();
  }

  async assertCustomerRowIsNotPresent(firstName, lastName, postalCode) {
    await expect(this.tableRows.last()).not.toContainText(firstName);
    await expect(this.tableRows.last()).not.toContainText(lastName);
    await expect(this.tableRows.last()).not.toContainText(postalCode);
  }

  async fillFirstNameToSearchField(firstName) {
    await this.searchField.fill(firstName);
  }

  async fillLastNameToSearchField(lastName) {
    await this.searchField.fill(lastName);
  }

  async fillPostalCodeToSearchField(postalCode) {
    await this.searchField.fill(postalCode);
  }

  async fakeCustomerRawIsPresent(firstName, lastName, postalCode) {
    await expect(this.tableRows).toContainText(firstName);
    await expect(this.tableRows).toContainText(lastName);
    await expect(this.tableRows).toContainText(postalCode);
  }

  async assertOnlyOneRowIsPresent() {
    await expect(this.tableRows).toHaveCount(1);
  }


}
