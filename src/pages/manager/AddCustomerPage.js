import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.placeHolderFirstName = page.getByPlaceholder('First Name');
    this.placeHolderLastName = page.getByPlaceholder('Last Name');
    this.placeHolderPostCode = page.getByPlaceholder('Post Code');
    this.clickAddCustomerForm = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.clickCustomerButton = page.getByRole('button', { name: 'Customers' });
    this.AccountButton = page.getByRole('button', { name: 'Open Account' });
  } 

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
      { 
        timeout: 5000, // Espera no máximo 5 segundos
        waitUntil: 'load' // Garante que a página disparou o evento de carregamento
      }
    );
  }
  
  async fillFirstNameField(firstName){
    await this.placeHolderFirstName.fill(firstName);
  }

  async fillLastNameField(lastName){
    await this.placeHolderLastName.fill(lastName);
  }

  async fillPostCodeField(postCode){
    await this.placeHolderPostCode.fill(postCode);
  }

  async clickSubmitAddCustomerForm(){
    await this.clickAddCustomerForm.click();
  }

  async clickButtonCustomer(){
    await this.clickCustomerButton.click();
  }

  async clickAccountButton(){
    await this.AccountButton.click();
  }
}
