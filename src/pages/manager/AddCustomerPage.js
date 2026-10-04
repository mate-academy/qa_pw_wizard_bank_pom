import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', {name: 'Add Customer'});
    this.customersButton = page.getByRole('button', {name: 'Customers'});
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postCode.fill(postCode);
    await this.addCustomerButton.click();
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }



}
