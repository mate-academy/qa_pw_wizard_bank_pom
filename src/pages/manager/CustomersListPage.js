import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
    this.firstNameCellLastRow = page.getByRole('row').last().getByRole('cell').nth(0);
    this.lastNameCellLastRow = page.getByRole('row').last().getByRole('cell').nth(1);
    this.postCodeCellLastRow = page.getByRole('row').last().getByRole('cell').nth(2);
    this.accountNumberCellLastRow = page.getByRole('row').last().getByRole('cell').nth(3);
    this.deleteCustomerCellLastRow = page.getByRole('row').last().getByRole('cell').nth(4);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }

  async assertFirstNameIsOnLastRow (firstName) {
    await expect(this.firstNameCellLastRow).toContainText(firstName);
  }

  async assertLastNameIsOnLastRow (lastName) {
    await expect(this.lastNameCellLastRow).toContainText(lastName);
  }

  async assertPostalCodeIsOnLastRow (postCode) {
    await expect(this.postCodeCellLastRow).toContainText(postCode);
  }

  async assertAccountNumberIsEmptyOnLastRow () {
    await expect(this.accountNumberCellLastRow).toHaveText('');
  }

  async assertCustomerRowIsAbsent(firstName,lastName,postCode) {
    const userRow = this.page.locator('tbody tr')
      .filter({ has: this.page.locator('td', { hasText: firstName }) })
      .filter({ has: this.page.locator('td', { hasText: lastName }) })
      .filter({ has: this.page.locator('td', { hasText: postCode }) });
  await expect(userRow).toBeHidden();
  }

  async assertCustomerRowIsPresent(firstName,lastName,postCode) {
    const userRow = this.page.locator('tbody tr')
      .filter({ has: this.page.locator('td', { hasText: firstName }) })
      .filter({ has: this.page.locator('td', { hasText: lastName }) })
      .filter({ has: this.page.locator('td', { hasText: postCode }) });
  await expect(userRow).toBeVisible();
  }

  async assertCustomerRowIsUnique(firstName,lastName,postCode) {
    const userRow = this.page.locator('tbody tr')
      .filter({ has: this.page.locator('td', { hasText: firstName }) })
      .filter({ has: this.page.locator('td', { hasText: lastName }) })
      .filter({ has: this.page.locator('td', { hasText: postCode }) });
  await expect(userRow).toHaveCount(1);
}

  async assertCustomerAccountNumberIsNotEmpty(firstName,lastName,postCode) {
    const userRow = this.page.locator('tbody tr')
      .filter({ has: this.page.locator('td', { hasText: firstName }) })
      .filter({ has: this.page.locator('td', { hasText: lastName }) })
      .filter({ has: this.page.locator('td', { hasText: postCode }) });
    await expect(userRow.getByRole('cell').nth(3)).not.toBeEmpty();
  }

  async fillSearchCustomerField(name) {
    await this.searchCustomerField.fill(name);
  }

  async deleteCustomer(firstName,lastName,postCode) {
    const userRow = this.page.locator('tbody tr')
      .filter({ has: this.page.locator('td', { hasText: firstName }) })
      .filter({ has: this.page.locator('td', { hasText: lastName }) })
      .filter({ has: this.page.locator('td', { hasText: postCode }) });
    await userRow.getByRole('button', { name: 'Delete' }).click();
    await expect(userRow).toBeHidden();
  }
}
