import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.customerFirstName = page.getByPlaceholder('First Name');
    this.customerLastName = page.getByPlaceholder('Last Name');
    this.postalCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customerListButton = page.getByRole('button', { name: 'Customers' }); 
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillCustomerFirstName(firstName){
    await this.customerFirstName.fill(firstName);
  }

  async fillCustomerLastName(lastName){
    await this.customerLastName.fill(lastName);
  }

  async fillPostalCodeField(postalCode){
    await this.postalCodeField.fill(postalCode);
  }

  async clickCustomerButton(){
    await this.addCustomerButton.click();
  }


  async clickCustomerListButton(){
    await  this.customerListButton.click();
  }

  async waitForCustomerListURL(){
    await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
  }


  async reloadPage(){
    await this.page.reload();
  }

}
