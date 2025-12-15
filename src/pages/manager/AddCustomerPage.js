import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('form').getByRole('button', {
       name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async clickAddCustomerButton(){
    await this.addCustomerButton.click();
  }

  async fillFirstName (value) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(value);
  }

  async fillLastName (value) {
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(value);
  }

  async fillPostalCode (value) {
    await this.page.getByRole('textbox', { name: 'Post Code' }).fill(value);
  }

  async reloadPage() {
    await this.page.reload();
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async goToCustomerPage() {
    await this.page.getByRole('button', { name: 'Customers' }).click();
  }
}
