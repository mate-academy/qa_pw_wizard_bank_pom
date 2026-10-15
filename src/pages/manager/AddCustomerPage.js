import { expect } from '@playwright/test';


export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.submitAddCustomerButton = page.getByRole('button', {name : 'Add Customer'}).nth(1);
    this.customersButton = page.getByRole('button', {name : 'Customers'});
  }
  


  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
}
