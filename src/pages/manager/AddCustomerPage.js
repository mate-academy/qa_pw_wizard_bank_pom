import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.tableRows = page.locator('table tbody tr');
  }


  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(name) {
    await this.firstName.fill(name);
  }

  async fillLastName(lastname) {
    await this.lastName.fill(lastname);
  }

  async fillPostCode(code) {
    await this.postCode.fill(code);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertFirstNameInLastRow(expectedFirstName) {
    const lastRow = this.tableRows.last();
    const firstNameCell = lastRow.locator('td').nth(0);
    await expect(firstNameCell).toHaveText(expectedFirstName);
  }

  async assertLastNameInLastRow(expectedLastName) {
    const lastRow = this.tableRows.last();
    const lastNameCell = lastRow.locator('td').nth(1);
    await expect(lastNameCell).toHaveText(expectedLastName);
  }

  async assertPostCodeInLastRow(expectedPostCode) {
    const lastRow = this.tableRows.last();
    const postCodeCell = lastRow.locator('td').nth(2);
    await expect(postCodeCell).toHaveText(expectedPostCode);
  }

  async assertNoAccountNumberInLastRow() {
    const lastRow = this.tableRows.last();
    const accountNumberCell = lastRow.locator('td').nth(3);
    await expect(accountNumberCell).toHaveText('');
  }
}