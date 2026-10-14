import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.formButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    
    this.tableLastRow = page.locator('table.table tbody tr').last();
    this.customarFirstName = this.tableLastRow.locator('td').nth(0);
    this.customarLastName = this.tableLastRow.locator('td').nth(1);
    this.customarPostCode = this.tableLastRow.locator('td').nth(2);
    this.customarAccountNumber = this.tableLastRow.locator('td').nth(3);
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async reloadPage() {
    await this.page.reload();
  }

  async fillField(locator, value) {
    await locator.fill(value);
  }

  async clickButton(locator) {
    await locator.click();
  }

  async assertCustomerData(locator, value) {
    await expect(locator).toHaveText(value);
  }

  async assertCustomerAccountNumber() {
    await expect(this.customarAccountNumber).toBeEmpty()
  }
}
