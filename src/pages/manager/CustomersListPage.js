import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async checkCustomerFirstName(firstName) {
    await expect(this.page.getByRole('row').last()).toContainText(firstName);
  }

  async checkCustomerLastName(lastName) {
    await expect(this.page.getByRole('row').last()).toContainText(lastName);
  }

  async checkCustomerPostCode(postCode) {
    await expect(this.page.getByRole('row').last()).toContainText(postCode);
  }

  async checkCustomerMissingAccountNumber(firstName) {
    const lastRow = this.page.getByRole('row').last();
    await expect(lastRow).toContainText(firstName);

    const accountCell = lastRow.locator('td').nth(3);
    await expect(accountCell).toBeEmpty();
  }

  async deleteCustomer(firstName, lastName) {
    const row = this.page.getByRole('row').filter({hasText: `${firstName} ${lastName}`});

    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async checkDeletedCustomer(firstName, lastName) {
    await expect(this.page.getByRole('row').filter({hasText: `${firstName} ${lastName}`})).toBeHidden();
  }

  async reloadCustomersPage() {
    await this.page.reload();
  }

  async assertCustomerAccountNumber(firstName){
     const lastRow = this.page.getByRole('row').last();
    await expect(lastRow).toContainText(firstName);

    const accountCell = lastRow.locator('td').nth(3);
    await expect(accountCell).not.toBeEmpty();
  }

  async findCustomerByFirstName(firstName) {
    await this.page.getByRole('textbox', { name: 'Search Customer' }).fill(firstName);
  }

  async findCustomerByLastName(lastName) {
    await this.page.getByRole('textbox', { name: 'Search Customer' }).fill(lastName);
  }  

  async findCustomerByPostalCode(postalCode) {
    await this.page.getByRole('textbox', { name: 'Search Customer' }).fill(postalCode);
  }    

  async assertSearchShowsOnlyOneResult() {
    await expect(this.page.locator('tbody tr')).toHaveCount(1);
  }

}
