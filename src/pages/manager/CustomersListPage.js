import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  
  getCustomerRow(firstName, lastName, postCode) {
    return this.page.locator('tr')
      .filter({ has: this.page.locator('td').nth(0).getByText(firstName, { exact: true }) })
      .filter({ has: this.page.locator('td').nth(1).getByText(lastName, { exact: true }) })
      .filter({ has: this.page.locator('td').nth(2).getByText(postCode, { exact: true }) });
  }

  async asserFirstNameisVisible(firstName, lastName, postCode) {
    await expect(this.getCustomerRow(firstName, lastName, postCode).locator('td').nth(0)).toBeVisible();
  }

  async assertLastNameisVisible(firstName, lastName, postCode) {
    await expect(this.getCustomerRow(firstName, lastName, postCode).locator('td').nth(1)).toBeVisible();
  }

  async assertPostCodeisVisible(firstName, lastName, postCode) {
    await expect(this.getCustomerRow(firstName, lastName, postCode).locator('td').nth(2)).toBeVisible();
  }

  async assertAccountNumberisEmpty(firstName, lastName, postCode) {
    await expect(this.getCustomerRow(firstName, lastName, postCode).locator('td').nth(3)).toBeEmpty();
  }

  async clickDeleteCustomerButton(firstName, lastName, postCode) {
    await this.getCustomerRow(firstName, lastName, postCode)
      .getByRole('button', { name: 'Delete' })
      .click();
  }

  async reload() {
    await this.page.reload();
  }

  async assertDeletedCustomerRowisHidden(firstName, lastName, postCode) {
    await expect(this.getCustomerRow(firstName, lastName, postCode)).toBeHidden();
  }

  async assertAccountNumberisNotEmpty(firstName, lastName, postCode) {
    await expect(this.getCustomerRow(firstName, lastName, postCode).locator('td').nth(3)).not.toBeEmpty();
  }

  async waitForCustomersListUrl() {
    await this.page.waitForURL('**/angularJs-protractor/BankingProject/#/manager/list');
  }

  async fillSearchField(input) {
    await this.searchCustomerField.fill(input);
  }

  async assertOnlySearchedCustomerRowIsVisible() {
    await expect(this.page.locator('tr').nth(2)).toBeHidden();
  }
}
