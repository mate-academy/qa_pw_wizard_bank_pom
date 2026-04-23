import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersButton = page. getByRole('button', { name: 'Customers' });
    this.rows = page.locator('tbody tr');
    this.lastRow = this.rows.last();
    this.firstNameInTheLastRow = this.lastRow.locator('td').nth(0);
    this.lastNameInTheLastRow = this.lastRow.locator('td').nth(1);
    this.postCodeInTheLastRow = this.lastRow.locator('td').nth(2);
    this.accountNumberInTheLastRow = this.lastRow.locator('td').nth(3);
    this.deleteCustomerButton = this.lastRow.getByRole('button',{name: 'Delete'});
    this.searchField = page.getByPlaceholder('Search Customer');
    

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickCustomersButton () {
    await this.customersButton.click();
  }

  async verifyCustomerFirstNameInLastRowTable(text) {
    await expect(this.firstNameInTheLastRow).toContainText(text);
  }

  async verifyCustomerLastNameInTheLastRowTable(text) {
    await expect(this.lastNameInTheLastRow).toContainText(text);
  }

  async verifyCustomerPostCodeInTheLastRowTable(text) {
    await expect(this.postCodeInTheLastRow).toContainText(text);
  }

  async verifyCustomerAccountNumberInTheLastRowTable() {
    await expect(this.accountNumberInTheLastRow).toBeEmpty();
  }

  async clickDeleteLastRowButton() {
    await this.deleteCustomerButton.click();
  }

  async verifyCustomerRowIsNotPresent(firstName, lastName, postCode) {
    const customerRow = this.page
      .locator('tbody tr')
      .filter({ hasText: `${firstName} ${lastName} ${postCode}` });

    await expect(customerRow).toHaveCount(0);
  }

  async verifyCustomerAccountNumberIsNotEmpty() {
    await expect(this.accountNumberInTheLastRow).not.toHaveText('');
  }

  async fillSearchCustomerField(value) {
    await this.searchField.fill(value);
  }

  async verifyCustomerRowIsPresent(value) {
    await expect(this.rows.filter({hasText: value})).toHaveCount(1);
  }

  async onlyOneRowIsPresent() {
    await expect(this.rows).toHaveCount(1);
}}
