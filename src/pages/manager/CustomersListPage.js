const { expect } = require('@playwright/test');
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
// const add1CustomerPage = new AddCustomerPage(page);


// const fakerFirstName = faker.person.firstName();

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.firstNameNewCustumer = page.getByRole('row').last().getByRole('cell').first();
    this.lastNameNewCustumer = page.getByRole('row').last().getByRole('cell').nth(1);
    this.postCodeNewCustumer = page.getByRole('row').last().getByRole('cell').nth(2);
    this.accountNumberNewCustumer = page.getByRole('row').last().getByRole('cell').nth(3);
    this.deleteButtonNewUser = page.getByRole('row').last().getByRole('cell').nth(4).getByRole('button');
    this.rowNewUser = page.getByRole('row').last();

  }

  // async assertDeleteRow(){
  //   expect(this.rowNewUser).toBeHidden();
  // }

  async clickDeleteButtonNewUser(){
    await this.deleteButtonNewUser.click();
  }

  async assertFirstNameNewUser(text){
    expect(this.firstNameNewCustumer).toHaveText(text);
  }

  async assertLastNameNewUser(text){
    expect(this.lastNameNewCustumer).toHaveText(text);
  }

  async assertPostCodeNewUser(text){
    expect(this.postCodeNewCustumer).toHaveText(text);
  }

  async assertAccountNumberNewUser(){
    expect(this.accountNumberNewCustumer).toBeEmpty();
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
}