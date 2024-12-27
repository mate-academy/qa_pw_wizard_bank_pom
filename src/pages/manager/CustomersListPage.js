const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.searchField = page.getByPlaceholder('Search Customer');
    
    // Table Header
    this.tableHeader = page.getByRole('row').first();
    this.headerFirstCell = this.tableHeader.getByRole('cell').nth(0); // First Name
    this.headerSecondCell = this.tableHeader.getByRole('cell').nth(1); // Last Name
    this.headerThirdCell = this.tableHeader.getByRole('cell').nth(2); // Post Code
    this.headerFourthCell = this.tableHeader.getByRole('cell').nth(3); // Account Number
    this.headerFifthCell = this.tableHeader.getByRole('cell').nth(4); // Delete Button

    //Last Data Row
    this.lastRow = page.getByRole('row').last();
    this.lastRowFirstNameCell = this.lastRow.getByRole('cell').nth(0);
    this.lastRowLastNameCell = this.lastRow.getByRole('cell').nth(1);
    this.lastRowPostCodeCell = this.lastRow.getByRole('cell').nth(2);
    this.lastRowAccountNumberCell = this.lastRow.getByRole('cell').nth(3);
    this.lastRowDeleteButton = this.lastRow.getByRole('button', { name: 'Delete' });
  
}

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
    }

  // Search Field Methods
  async searchCustomerByFirstName(firstName) {
    await this.searchField.fill(firstName);
  }
  async searchCustomerByLastName(lastName) {
    await this.searchField.fill(lastName);
  }
  async searchCustomerByPostCode(postCode) {
    await this.searchField.fill(postCode);
  }

  async clearSearchField() {
    await this.searchField.fill('');
  }

  // Assertions for Search
  async assertSearchFieldContainsText(text) {
    await expect(this.searchField).toHaveValue(text);
  }

  // Header Assertions
  async assertHeaderIsVisible() {
    await expect(this.tableHeader).toBeVisible();
  }

  async assertHeaderFirstCellContainsText(text) {
    await expect(this.headerFirstCell).toContainText(text);
  }

  async assertHeaderSecondCellContainsText(text) {
    await expect(this.headerSecondCell).toContainText(text);
  }

  async assertHeaderThirdCellContainsText(text) {
    await expect(this.headerThirdCell).toContainText(text);
  }

  async assertHeaderFourthCellContainsText(text) {
    await expect(this.headerFourthCell).toContainText(text);
  }

  async assertHeaderFifthCellContainsText(text) {
    await expect(this.headerFifthCell).toContainText(text);
  }

  // Row Assertions
  async asserLastRowIsVisible() {
    await expect(this.lastRow).toBeVisible();
  }

  async assertLastRowFirstNameContainsText(firstName) {
    await expect(this.lastRowFirstNameCell).toContainText(firstName);
  }


  async assertLastRowLastNameContainsText(lastName) {
    await expect(this.lastRowLastNameCell).toContainText(lastName);
  }

  async assertLastRowPostCodeContainsText(postCode) {
    await expect(this.lastRowPostCodeCell).toContainText(postCode);
  }

  async assertLastRowAccountNumberNotContainsText(text) {
    await expect(this.lastRowAccountNumberCell).toContainText('');
  }

  async assertLastRowAccountNumberContainsText(text) {
    await expect(this.lastRowAccountNumberCell).toContainText(text);
  }

  // Delete Button Methods
  async assertDeleteButtonIsVisible() {
    await expect(this.lastRowDeleteButton).toBeVisible();
  }

  async clickDeleteButtonForLastRow() {
    await this.lastRowDeleteButton.click();
  }
  
 
  async assertLastRowIsHidden() {
    await expect(this.lastRow).toBeHidden({ timeout: 30000 });
  }

  async waitForRowToBeRemoved() {
    await this.lastRow.waitFor({ 
      state: 'hidden',
      timeout: 30000  
     });
  }

  async waitForRowToBeDetached() {
  await this.lastRow.waitFor({ state: 'detached', timeout: 30000 });

}
}
