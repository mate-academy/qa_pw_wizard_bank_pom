import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.AddCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customerButton = page.getByRole('button', { name: 'Customers' });
    this.containValues = page.getByText('First Name : Last Name : Post');
  }
  

  async open() {
    await this.page.goto(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust',
    );}
  
  async firstNameFieldFill (text){
    await this.firstNameField.fill(text);
  }
  async lastNameFieldFill(text){
    await this.lastNameField.fill(text);
  }
  async postCodeFieldFill(text){
    await this.postCodeField.fill(text);
  }
  async AddCustomerButtonClick(){
    await this.AddCustomerButton.click();
  }
  async customerButtonClick(){
    await this.customerButton.click();
  }
  async containValuesAssert (firstName){
    await expect(this.containValues).containValues(firstName)
  }
}

