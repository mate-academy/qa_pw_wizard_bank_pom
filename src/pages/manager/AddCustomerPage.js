import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last name');
    this.postalCodeField = page.getByPlaceholder('Post code');
    this.clickButtonAddCustomer = page.getByRole('form').getByRole('button', { name: 'Add Customer' })
    this.buttonCustomer = page.getByRole('button', { name: 'Customers' });
    this.buttonAccount = page.getByRole('button', { name: 'Open Account' });
    this.selectName = page.locator('#userSelect');
    this.selectCurrency = page.locator('#currency');
    this.buttonProcess = page.getByRole('button', { name: 'Process' });

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
  async fillData (data) {
    
  }
  async customerForm (firstName, lastName, postCode) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postCode);
  }
  async clickButtonAddC () {
    await this.clickButtonAddCustomer.click();
  }
  async reload () {
    await this.page.reload();
  }
  async clickCustomerb () {
    await this.buttonCustomer.click();
  }
  async clickOpenAccount () {
    await this.buttonAccount.click();
  }
  async name (name1) {
    await this.selectName.selectOption(name1)
    await expect(this.selectName).toHaveValue(name1);
  }
  async currency (sCurrency) {
    await this.selectCurrency.selectOption(sCurrency);
    await expect (this.selectCurrency).toHaveValue(sCurrency);
  }
  async clickProcess () {
    await this.buttonProcess.click();
  }
}
