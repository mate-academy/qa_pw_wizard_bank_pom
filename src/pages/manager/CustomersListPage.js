import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastCustomerRow = page.getByRole('row').last();
    this.searchCustomerInput = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertCustomerFirstNameInLastRow(firstName) {
    await expect(this.lastCustomerRow.getByRole('cell').nth(0)).toHaveText(
      firstName,
    );
  }

  async assertCustomerLastNameInLastRow(lastName) {
    await expect(this.lastCustomerRow.getByRole('cell').nth(1)).toHaveText(
      lastName,
    );
  }

  async assertCustomerPostalCodeInLastRow(postalCode) {
    await expect(this.lastCustomerRow.getByRole('cell').nth(2)).toHaveText(
      postalCode,
    );
  }

  async assertCustomerAccountNumberInLastRowIsEmpty() {
    await expect(this.lastCustomerRow.getByRole('cell').nth(3)).toBeEmpty();
  }

  findCustomerRow(firstName, lastName) {
    return this.page.getByRole('row').filter({ hasText: `${firstName} ${lastName}` });
  }

  async clickDeleteButtonForCustomer(firstName, lastName) {
    await this.findCustomerRow(firstName, lastName).getByRole('button').click();
  }

  async assertCustomerRowIsNotPresent(firstName, lastName) {
    await expect(this.findCustomerRow(firstName, lastName)).not.toBeVisible();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async assertCustomerRowIsPresentWithAccountNumber(firstName, lastName) {
    await expect(this.findCustomerRow(firstName, lastName).getByRole('cell').nth(3)).not.toBeEmpty();
  }

  async fillSearchCustomerInput(nameToSearch) {
    await this.searchCustomerInput.fill(nameToSearch);
  }

  async assertCustomerRowIsPresent(firstName, lastName) {
    await expect(this.findCustomerRow(firstName, lastName)).toBeVisible();
  }

  async assertNoOtherRowsArePresent() {
    await expect(this.page.locator('tbody tr')).toHaveCount(1);
  }
}
