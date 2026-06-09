import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.locator('form[name="myForm"]')
    .getByRole('button', { name: 'Add Customer' });
    this.firstNameInputField = page.getByPlaceholder('First Name');
    this.lastNameInputField = page.getByPlaceholder('Last Name');
    this.postCodeInputField = page.getByPlaceholder('Post Code');
    this.customersButton = page.getByRole('button', { name: 'Customers' });
   
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async reload() {
    await this.page.reload();
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }
  
  async fillFirstNameInputField(firstName) {
    await this.firstNameInputField.fill(firstName);
  }

  async fillLastNameInputField(lastName) {
    await this.lastNameInputField.fill(lastName);
  }

  async fillPostCodeInputField(postCode) {
    await this.postCodeInputField.fill(postCode);
  }
  
  async clickCustomersButton() {
    await this.customersButton.click();
  }

}
