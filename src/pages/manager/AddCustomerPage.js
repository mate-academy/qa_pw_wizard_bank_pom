import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNamePlaceholder = page.getByPlaceholder('First Name');
    this.lastNamePlaceholder = page.getByPlaceholder('Last Name');
    this.postCodePlaceholder = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.viewCustomersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });

  }


  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async reload() {
    await this.page.reload();
  }
  
  async fillFirstName(text) {
     await this.firstNamePlaceholder.fill(text);
  }

  async fillLastName(text) {
    await this.lastNamePlaceholder.fill(text);
  }

  async fillPostCode(text) {
    await this.postCodePlaceholder.fill(text);
  }

  async clickAddCustomer() {
    await this.addCustomerButton.click();
  }

  async clickCustomers() {
    await this.viewCustomersButton.click();
  }

  async clickOpenAccount() {
    await this.openAccountButton.click();
  }


}

