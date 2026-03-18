import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersPageButton = page.getByRole('button', { name: 'Customers' });

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
);
  }

  async firstNameFieldFill(text) {
 await this.firstNameField.fill(text);
  }

  async lastNameFieldFill(text) {
 await this.lastNameField.fill(text);
  }

  async postCodeFieldFill(text) {
 await this.postCodeField.fill(text);
  }

  async addCustomerButtonClick(){
    await this.addCustomerButton.click();
  }

  async reloadPage(){
    await this.page.reload();
  }

  async customersPageButtonClick(){
    await this.customersPageButton.click();
  }


}
