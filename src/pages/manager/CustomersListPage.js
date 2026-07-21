import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.locator("tbody tr").last();
    this.deleteButton = this.lastRow.getByRole("button", { name: "Delete" });
    this.accountNumber = this.lastRow.locator("td").nth(3);
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
    this.row = page.locator("tbody tr");
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async fillFirstNameInSearchField(firstName) {
    await this.searchCustomerField.fill(firstName);
  }

  async fillLastNameInSearchField(lastName) {
    await this.searchCustomerField.fill(lastName);
  }

  async fillPostCodeInSearchField(postCode) {
    await this.searchCustomerField.fill(postCode);
  }

  async assertCustomerFirstNameIsPresent(firstName) {
    await expect(this.lastRow).toContainText(firstName);
  }

  async assertCustomerLastNameIsPresent(lastName) {
    await expect(this.lastRow).toContainText(lastName);
  }

  async assertCustomerPostCodeIsPresent(postCode) {
    await expect(this.lastRow).toContainText(postCode);
  }

  async assertCustomerRowIsNotVisible(firstName) {
    await expect(this.lastRow).not.toContainText(firstName);
  }

  async assertAccountNumberNotEmpty() {
    await expect(this.accountNumber).toBeVisible();
  }

  async assertAccountNumberIsEmpty() {
    await expect(this.accountNumber).toContainText("");
  }

  async assertCustomerRowIsPresent(firstNameOrLastName) {
    await expect(this.row).toContainText(firstNameOrLastName);
  }

  async assertCustomerRowWithPostCodeIsPresent(postCode) {
    await expect(this.row).toContainText(postCode);
  }

  async assertOnlyOneCustomerRowIsPresent() {
   await expect(this.row).toHaveCount(1);
  }
}
