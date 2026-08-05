import { expect } from '@playwright/test';
import { BankManagerMainPage } from './BankManagerMainPage';

export class AddCustomerPage extends BankManagerMainPage {
  static URL = '/angularJs-protractor/BankingProject/#/manager/addCust';

  constructor(page) {
    super(page);
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addButton = page.getByRole('form').getByRole('button', { name: 'Add Customer'});
  }

  // async open() {
  //   await this.page.goto(AddCustomerPage.URL);
  //   await this.waitForOpened();
  // }

  // async waitForOpened() {
  //   await this.page.waitForURL(AddCustomerPage.URL);
  // }

  async enterFirstName(name) {
    await this.firstNameField.fill(name);
  }

  async enterLastName(name) {
    await this.lastNameField.fill(name);
  }

  async enterPostCode(code) {
    await this.postCodeField.fill(code);
  }

  async addCustomer() {
    await this.addButton.click();
  }

  async registerCustomer(customer) {
    await this.enterFirstName(customer.firstName);
    await this.enterLastName(customer.lastName);
    await this.enterPostCode(customer.postCode);
    await this.addCustomer();
  }
}
