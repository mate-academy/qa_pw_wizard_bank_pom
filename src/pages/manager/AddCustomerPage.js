import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).last(); 
    this.customersTab = page.getByRole('button', { name: 'Customers' });
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
 }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
  async reloadPage() {
      await this.page.reload();
  }
  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.postCodeInput.fill(postCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }
  async clickCustomersTab() {
    await this.customersTab.click();
  }
  async clickOpenAccountTab() {
    await this.openAccountTab.click();
  }
}
