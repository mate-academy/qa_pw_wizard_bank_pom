import { expect } from "@playwright/test";

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postalCodeInput = page.getByPlaceholder("Post Code");
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' })
    this.customerButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' })
    this.addCustomerTabButton = page.getByRole('button', { name: 'Add Customer' })
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/addCust",
    );
  }

  async fillFirstName(text) {
    await this.firstNameInput.fill(text);
  }

  async fillLastName(text) {
    await this.lastNameInput.fill(text)
  };

  async fillPostalCodeFill(text) {
    await this.postalCodeInput.fill(text)
  };

  async clickAddCustomerButton() {
    await this.addCustomerButton.click()
  };

  async clickCustomerButton() {
    await (this.customerButton).click();
  };

  async clickOpenAccountButton() {
    await this.openAccountButton.click()
  }
  async clickAddCustomerTabButton() {
    await this.addCustomerTabButton.click()
  }

 
}
