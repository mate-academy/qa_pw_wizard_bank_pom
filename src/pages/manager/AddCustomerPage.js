import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.selectCustomerDropdown = page.locator('#userSelect');
    this.selectCurrencyDropdown = page.locator('#currency');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillCustomerForm({ firstName, lastName, postCode }) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postCodeField.fill(postCode);
  }

  async clickAddCustomerButton() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(); // dismiss success popup
    });

    await this.addCustomerButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async selectCustomer(fullName) {
    await this.selectCustomerDropdown.selectOption(fullName);
  }

  async selectCurrency(currency) {
    await this.selectCurrencyDropdown.selectOption(currency);
  }

  async clickProcessButton() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await this.processButton.click();
  }
}
