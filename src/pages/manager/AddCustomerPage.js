import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('button', {name: 'Add Customer'}).nth(1);
    this.customersButton = page. getByRole('button', {name: 'Customers'});
    this.openAccountButton = page. getByRole('button', {name: 'Open Account'});
  
  
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
  async  fillFirstNameField(text) {
  await this.firstNameField.fill(text);
  }
  async  fillLastNameField(text) {
  await this.lastNameField.fill(text);
  }
  async  fillPostCodeField(text) {
  await this.postCodeField.fill(text);
  }

  async  clickAddCustomerButton() {
  await this.addCustomerButton.click();
  }
 async  clickCustomersButton() {
  await this.customersButton.click();
  }
   
  async clickOpenAccountsButton() {
    await this.openAccountButton.click();
  }
  }


  

