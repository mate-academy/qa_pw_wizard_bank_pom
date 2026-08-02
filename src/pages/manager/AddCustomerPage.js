import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameForm = page.getByPlaceholder('First Name');
    this.lastNameForm = page.getByPlaceholder('Last Name');
    this.postCodeForm = page.getByPlaceholder('Post Code');
    this.addCustomerButtonForm = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async waitForOpened() {
    await this.page.waitForURL(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstNameForm(firstName) {
    await this.firstNameForm.fill(firstName);
  }
  
  async fillLastNameForm(lastName) {
    await this.lastNameForm.fill(lastName);
  }

  async fillPostCodeForm(postCode) {
    await this.postCodeForm.fill(postCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButtonForm.click();
}
  
}
