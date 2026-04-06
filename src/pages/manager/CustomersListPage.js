import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCastomerField = page.getByPlaceholder('Search Customer');
    this.customerRow = page.locator('.marTop > div');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async reload(){
    await this.page.reload();
  }

   async cellIsPresent(value){
    await expect(this.page.getByRole('cell', { name: value })).toBeVisible();
   }

  async newCustomerNoAccountNumber(firstName){
    await expect(this.page.getByRole('row', { name: firstName }).getByRole('cell').nth(3)).toBeEmpty();
  }

  async deleteCustomer(firstName){
    await this.page.getByRole('row', { name: firstName }).getByRole('button').click();
  }

  async customerFirstNameIsNotPresent(firstName){
    await expect(this.page.getByRole('cell', { name: firstName })).toBeHidden();
  }

  async newCustomerHasAccountNumber(firstName){
    await expect(this.page.getByRole('row', { name: firstName }).getByRole('cell').nth(3)).toBeVisible();
  }

  async searchCastomerByFirstName(firstName){
    await this.searchCastomerField.fill(firstName);
  }
  async assertHowManyRowIsPresent(value){
    await expect(this.customerRow).toHaveCount(value)
  }
}
