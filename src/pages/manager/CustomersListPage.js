import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.tableOfCustomers = this.page.getByRole('table');
    //this.customerRow = this.tableOfCustomers.getByRole('row', { hasText: `${firstName} ${lastName} ${postCode}` });
    //this.lastRow = this.tableOfCustomers.getByRole('row').last();
    //this.accountNumberCell = this.customerRow.getByRole('cell').nth(3);

    //this.deleteCustomerCell = this.customerRow.getByRole('cell').nth(4);
    //this.deleteCustomerButton = this.deleteCustomerCell.getByRole('button');

    this.searchField = this.page.getByPlaceholder('Search Customer');
    this.secondRow = this.tableOfCustomers.getByRole('row').nth(1);
    this.firstNameSellInSecondRow = this.secondRow.getByRole('cell').nth(0);
    this.lastNameSellInSecondRow = this.secondRow.getByRole('cell').nth(1);
    this.postalCodeSellInSecondRow = this.secondRow.getByRole('cell').nth(2);
    this.thirdRow = this.tableOfCustomers.getByRole('row').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickDeleteCustomerButton(firstName, lastName, postCode) {
    const customerRow = this.tableOfCustomers
    .getByRole('row')
    .filter({ hasText: `${firstName} ${lastName} ${postCode}` });
    const deleteCell = customerRow.getByRole('cell').nth(4);
    const deleteButton = deleteCell.getByRole('button').filter({ name: 'Delete'});
    await deleteButton.click();
  }

  async lastRowVisible(firstName, lastName, postCode) {
    const customerRow = this.tableOfCustomers
      .getByRole('row')
      .filter({ hasText: `${firstName} ${lastName} ${postCode}` }); //need fixes
    await expect(customerRow).toBeVisible();
  }

  async lastRowNotVisible(firstName, lastName, postCode) {
    const customerRow = this.tableOfCustomers
      .getByRole('row')
      .filter({ hasText: `${firstName} ${lastName} ${postCode}` }); //need fixes
    await expect(customerRow).toHaveCount(0);
  }

  async customerRowVisible(firstName, lastName, postCode) {
    const customerRow = this.tableOfCustomers
      .getByRole('row')
      .filter({ hasText: `${firstName} ${lastName} ${postCode}` }); //need fixes
    await expect(customerRow).toBeVisible();
  }

  async waitForLoading() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reloadThePage() {
    //await this.page.reload();
    await this.page.on('dialog', dialog => dialog.accept());
  }

  /*async checkAccountNumberCellNotEmpty() {
    await expect(this.accountNumberCell).not.toBeEmpty();
  }*/

  async checkAccountNumberCellEmpty(fullName, postCode) {
    const customerRow = this.tableOfCustomers
      .getByRole('row')
      .filter({ hasText: `${fullName} ${postCode}` });
    const accountNumberCell = customerRow.getByRole('cell').nth(3);
    await expect(accountNumberCell).toBeEmpty();
  }

  async checkAccountNumberCellNotEmpty(fullName, postCode) {
    const customerRow = this.tableOfCustomers
      .getByRole('row')
      .filter({ hasText: `${fullName} ${postCode}` });
    const accountNumberCell = customerRow.getByRole('cell').nth(3);
    await expect(accountNumberCell).not.toBeEmpty();
  }

  async fillSearchField(firstName) {
    await this.searchField.fill(firstName);
  }

  async tableContainsTheCustomer(firstName) {
    await expect(this.tableOfCustomers).toHaveText(firstName);
  }

  async secondRowContainsTheName(firstName, lastName, postalCode) {
    await expect(this.firstNameSellInSecondRow).toContainText(firstName, lastName, postalCode);
  }

  async secondRowContainsTheLastName(firstName, lastName, postalCode) {
    await expect(this.lastNameSellInSecondRow).toContainText(firstName, lastName, postalCode);
  }

  async secondRowContainsPostalCode(firstName, lastName, postalCode) {
    await expect(this.postalCodeSellInSecondRow).toContainText(firstName, lastName, postalCode);
  }

  async thirdRowIsNotVisible() {
    await expect(this.thirdRow).not.toBeVisible();
  }
}
