const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.locator('table tbody tr').last();
    this.tableBody = page.locator('table tbody');
    this.searchField = page.getByPlaceholder('Search Customer');
    
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async hiddenAccountNumberInTheLastRow() {

    const lastRowAccountNumber = this.lastRow.locator('td').last().nth(2);
    await expect(lastRowAccountNumber).toBeHidden();
  }

  async clickDeletLastButton() {
    const deleteLastButton = this.lastRow.locator('button').last();
    await deleteLastButton.click();
  }

  async assertLastRowContains(firstName, lastName, postCode) {
    await expect(this.lastRow).toContainText(firstName);
    await expect(this.lastRow).toContainText(lastName);
    await expect(this.lastRow).toContainText(postCode);
  }

  async assertCustomerIsNotInTable(firstName, lastName, postCode) {
    await expect(this.tableBody).not.toContainText(firstName);
    await expect(this.tableBody).not.toContainText(lastName);
    await expect(this.tableBody).not.toContainText(postCode);
  }

  async reloadPage() {
    await this.page.reload();
  }

  async clickSearchField() {
    await this.searchField.click();
  }

  async fillDateInTheSearchField(firstName, lastName, postCode) {
    await this.searchField.fill(firstName, lastName, postCode);
  }

  async visibelCustomersDate(firstName, lastName, postCode) {
    await expect(this.tableBody).toContainText(firstName, lastName, postCode);
  }

  async assertOnlyOneRowVisible() {
    const rows = this.page.locator('table tbody tr');
    await expect(rows).toHaveCount(1);
  }
  

}