import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
  this.page = page;
  this.firstName = page.getByRole('textbox', {
      name: 'First Name'
  });
  this.lastName = page.getByRole('textbox', {
  name: 'Last Name'
  });
  this.postCode = page.getByRole('textbox', {
      name: 'Post Code'
  });
  this.addCustomerButton = page.locator('form').getByRole( 'button', {
      name: 'Add Customer'
  });
  this.customersButton = page.getByRole( 'button', {
      name: 'Customers'
  });
  
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    ); 
  }
  async fillForm(firstName, lastName, postCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postCode.fill(postCode);
  }

  async submitForm() {
    await this.addCustomerButton.click()
  }

}
