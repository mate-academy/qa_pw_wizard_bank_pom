import { expect } from '@playwright/test';
import { BankManagerMainPage } from './BankManagerMainPage';

export class CustomersListPage extends BankManagerMainPage {
  constructor(page) {
    super(page);
    this.customersTable = page.getByRole('table');
    this.customersTableRow = this.customersTable.getByRole('row');
    this.lastRowFirstNameCell = this.customersTableRow.last().getByRole('cell').nth(0);
    this.lastRowLastNameCell = this.customersTableRow.last().getByRole('cell').nth(1);
    this.lastRowPostCodeCell = this.customersTableRow.last().getByRole('cell').nth(2);
    this.lastRowAccountNumberCell = this.customersTableRow.last().getByRole('cell').nth(3);
    this.deleteCustomerButton = page.getByRole('button', { name: 'Delete' });
    this.searchField = page.getByRole('textbox', { name: 'Search Customer' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  getCustomerRow({ firstName, lastName, postCode }) {
    return this.customersTableRow
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .filter({ hasText: postCode });
  }

  async deleteCustomer({ firstName, lastName, postCode }) {
    const customerRow = this.getCustomerRow({ firstName, lastName, postCode });
    await customerRow.locator(this.deleteCustomerButton).click();
  }

  async fillSearchField(value) {
    await this.searchField.fill(value);
  }

  async assertFirstNameInLastRow(firstName) {
    await expect(this.lastRowFirstNameCell).toContainText(firstName);
  }

  async assertLastNameInLastRow(lasName) {
    await expect(this.lastRowLastNameCell).toContainText(lasName);
  }

  async assertPostCodeInLastRow(postCode) {
    await expect(this.lastRowPostCodeCell).toContainText(postCode);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumberCell).toBeEmpty();
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.lastRowAccountNumberCell).not.toBeEmpty();
  }

  async assertCustomerIsPresentInTable({ firstName, lastName, postCode }) {
    await expect(this.getCustomerRow({ firstName, lastName, postCode })).toBeVisible();
  }

  async assertCustomerIsNotPresentInTable({ firstName, lastName, postCode }) {
    await expect(this.getCustomerRow({ firstName, lastName, postCode })).toBeHidden();
  }

  async assertOnlyOneRowIsDisplayed() {
    await expect(this.customersTableRow).toHaveCount(2);
  }
}
