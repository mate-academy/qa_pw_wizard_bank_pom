import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.submitButton = page.getByRole('button', { name: 'Add Customer' }).nth(1);
    this.customersButton = page.getByRole('button', {name: 'Customers'});
    this.openAccountButton = page.getByRole('button', {name: 'Open Account'});
   
  }

  async open() {
    await this.page.goto(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async waitForLoading() {
    await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForLoadingAccount() {
    await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');
  }



  async fillFirstNameField(firstName) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastNameField(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async fillPostCodeField(zipCode) {
    await this.postCodeField.fill(zipCode);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

 

  // async waitForLoading() {
  //   await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
  // }

  
}
