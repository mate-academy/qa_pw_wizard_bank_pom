import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async reload(){
    await this.page.reload();
  }

  // async customerFirstNameIsPresent(firstName){
  //   await expect(this.page.getByRole('cell', { name: firstName })).toBeVisible();
  // }

  // async customerLastNameIsPresent(lastName){
  //   await expect(this.page.getByRole('cell', { name: lastName })).toBeVisible();
  // }

  // async customerPostCodeIsPresent(postCode){
  //   await expect(this.page.getByRole('cell', { name: postCode })).toBeVisible();
  //  }

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
}
