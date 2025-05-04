const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.firstNameField = page.locator('tbody tr td:nth-child(1)').last();
    this.lastNameField = page.locator('tbody tr td:nth-child(2)').last();
    this.postCodeField = page.locator('tbody tr td:nth-child(3)').last();
    this.accountNumberField = page.locator('tbody tr td:nth-child(4)').last();
    this.customerField = page.getByPlaceholder('Search Customer');
    this.rowCount = page.locator('tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async checkToContainFirstName(firstName) {
    await expect(this.firstNameField).toContainText(firstName);
  }

  async checkToFirstNameIsNoVisible(firstName) {
    const customerCell = this.page.locator('tbody tr td:nth-child(1)', { hasText: firstName });
    await expect(customerCell).not.toBeVisible();
  }

  async checkToFirstNameIsVisible(firstName) {
    const customerCell = this.page.locator('tbody tr td:nth-child(1)', { hasText: firstName });
    await expect(customerCell).toBeVisible({ timeout: 10000 });
  }

  async checkToContainLastName(lastName) {
    await expect(this.lastNameField).toContainText(lastName);
  }

  async checkToContainPostCode(postCode) {
    await expect(this.postCodeField).toContainText(postCode);
  }

  async checkToAccountNumberIsEmpty() {
    await expect(this.accountNumberField).toBeEmpty();
  }

  async checkToAccountNumberIsNoEmpty() {
    await expect(this.accountNumberField).not.toHaveText('');
  }

  async customerFieldClick() {
    await this.customerField.click();
  }

  async deleteCustomerByDetails(firstName, lastName, postCode) {
    const customerRow = this.page.getByRole('row', { name: `${firstName} ${lastName} ${postCode}` });
    const deleteButton = customerRow.getByRole('button');
    await deleteButton.click();
  }

  async searchCustomer(firstName) {
    await this.customerField.fill(firstName);
  }

  async checkOneRow() {
    await expect(this.rowCount).toHaveCount(1);
  }
}