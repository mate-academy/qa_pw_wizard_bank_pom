import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.searchField = page.getByPlaceholder('Search Customer');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });

    this.tableHeader = page.getByRole('row').first();
    this.headerFirstCell = this.tableHeader.getByRole('cell').nth(0);
    this.headerSecondCell = this.tableHeader.getByRole('cell').nth(1);
    this.headerThirdCell = this.tableHeader.getByRole('cell').nth(2);
    this.headerFourthCell = this.tableHeader.getByRole('cell').nth(3);
    this.headerFifthCell = this.tableHeader.getByRole('cell').nth(4);

    this.allRows = page.getByRole('row');

    this.lastRow = page.getByRole('row').last();
    
    this.lastRowFirstName = this.lastRow.getByRole('cell').nth(0);
    this.lastRowLastName = this.lastRow.getByRole('cell').nth(1);
    this.lastRowPostCode = this.lastRow.getByRole('cell').nth(2);
    this.lastRowAccountNumber = this.lastRow.getByRole('cell').nth(3);
    this.lastRowDeleteCustomerButton = this.lastRow.getByRole('cell').nth(4).getByRole('button');

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForOpened() {
    await this.page.waitForURL(
      '/angularJs-protractor/BankingProject/#/manager/list',
    );
  }

  async reload() {
    await this.page.reload();
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickLastRowDeleteCustomerButton() {
    await this.lastRowDeleteCustomerButton.click();
  }

  async assertLastRowFirstNameHaveText(firstName) {
    await expect(this.lastRowFirstName).toHaveText(firstName);
  }

  async assertLastRowLastNameHaveText(lastName) {
    await expect(this.lastRowLastName).toHaveText(lastName);
  }

  async assertLastRowPostCodeHaveText(postCode) {
    await expect(this.lastRowPostCode).toHaveText(postCode);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumber).toBeEmpty();
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.lastRowAccountNumber).not.toBeEmpty();
  }

  async assertCustomerRowIsNotPresent(firstName, lastName, postCode) {
  const customerRow = this.page.getByRole('row', {
    name: `${firstName} ${lastName} ${postCode}`,
  });
  await expect(customerRow).toBeHidden();
  }

  async assertCustomerRowIsVisible(firstName, lastName, postCode) {
  const customerRow = this.page.getByRole('row', {
    name: `${firstName} ${lastName} ${postCode}`,
  });
  await expect(customerRow).toBeVisible();
  }

  async fillSearchField(searchText) {
    await this.searchField.fill(searchText);
  }

  async assertNoOtherRowIsPresentInTheTable() {
    await expect(this.allRows).toHaveCount(2);
  }

  async assertRowsCount(expectedCount) {
    await expect(this.allRows).toHaveCount(expectedCount);
  }

}
