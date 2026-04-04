import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Post Code');
    this.buttonAddCustomer = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.buttonCustomer = page.getByRole('button', { name: 'Customers' });

    const getRaw = page.locator('tr').last();
    this.customerFirstName = getRaw.getByRole('cell').nth(0);
    this.customerLastName = getRaw.getByRole('cell').nth(1);
    this.customerPostalCode = getRaw.getByRole('cell').nth(2);
    this.customerAccountNumber = getRaw.getByRole('cell').nth(3);
    this.deleteCustomer = getRaw.getByRole('button', { name: 'Delete' });

    //From managerCanOpenAccount
    this.buttonOpenAccount = page.getByRole('button', { name: 'Open Account' });
    };
  
  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstName(name) {
    await this.firstName.fill(name);
  }

  async fillLastName(name) {
    await this.lastName.fill(name);
  }

  async fillPostCode(code) {
    await this.postalCode.fill(code);
  }

  async clickButtonAddCustomer() {
    await this.buttonAddCustomer.click();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async clickButtonCustomer() {
    await this.buttonCustomer.click();
  }

  async waitForCustomerUrl() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertCustomerFirstName() {
    await expect(this.customerFirstName).toBeVisible();
  }

  async assertCustomerLastName() {
    await expect(this.customerLastName).toBeVisible();
  }

  async assertCustomerPostalCode() {
    await expect(this.customerPostalCode).toBeVisible();
  }

  async assertAccountNumber() {
    await expect(this.customerAccountNumber).toHaveText('');
  }

  async clickDeleteCustomer() {
    await this.deleteCustomer.click();
  }

  async assertDeletedCustomerRaw() {
    await expect(this.customerAccountNumber).not.toHaveText('');
  }

  //From managerCanOpenAccount
  async clickButtonOpenAccount() {
    await this.buttonOpenAccount.click();
  }
};




