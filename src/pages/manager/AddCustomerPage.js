import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
  async reload(){
    await this.page.reload();
  }

  async firstNameHolderFill(firstName){
    await this.page.getByPlaceholder('First Name').fill(firstName);
  }

  async lastNameHolderFill(lastName){
    await this.page.getByPlaceholder('Last Name').fill(lastName);
  }

  async postCodeHolderFill(postCode){
    await this.page.getByPlaceholder('Post Code').fill(postCode);
  }

  async createCastomerButtonClick(){
    await this.page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
  }

  async customerButtonClick(){
    await this.page.getByRole('button', { name: 'Customers' }).click();
  }
}
