import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async fillSearchField(value) {
    await this.page.getByRole('textbox', { name: 'Search Customer' }).fill(value);
  }

  async assertCustomerRowInTable (value) {
    await expect(this.page.getByRole('row').nth(1)).toContainText(value);
  }

  async noOtherRow () {
    await expect(this.page.getByRole('row').nth(2)).toBeHidden();
  }
  async deleteLastAddedCustomer () {
    await this.page.getByRole('button', { name: 'Delete' }).last().click();
  }

  async assertCustomerDeleted (customerName) {
    const row = this.page.locator('table tbody tr').filter({ hasText: customerName });
    await expect(row).toBeHidden();
  }

  async lastClientHaveAccountNumber(){
    const accountNumberCell = this.page.getByRole('row').last().locator('td').nth(3);
    await expect(accountNumberCell).not.toHaveText('');
  }

  async lastClientHaveFirstName(firstName){
    const accountNumberCell = this.page.getByRole('row').last().locator('td').first();
    await expect(accountNumberCell).toHaveText(firstName);
  }
  
  async lastClientHaveLastName(lastName){
    const accountNumberCell = this.page.getByRole('row').last().locator('td').nth(1);
    await expect(accountNumberCell).toHaveText(lastName);
  }

  async lastClientHavePostCode(postCode){
    const accountNumberCell = this.page.getByRole('row').last().locator('td').nth(2);
    await expect(accountNumberCell).toHaveText(postCode);
  } 

  async checkAccountNumberEmpty(){
    const accountNumberCell = this.page.getByRole('row').last().locator('td').nth(3);
    await expect(accountNumberCell).toHaveText('');
  }

  async reloadPage(){
    await this.page.reload();
  }
}
