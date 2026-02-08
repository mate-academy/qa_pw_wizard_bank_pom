import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = this.page.locator('[placeholder="First Name"]');
    this.lastNameField = this.page.locator('[placeholder="Last Name"]');
    this.postalCodeField = this.page.locator('[placeholder="Post Code"]');
    this.addCustomerSubmitButton = this.page.locator('button[type="submit"]').filter({ hasText: 'Add Customer' });
    this.customersButton = this.page.locator('button:has-text("Customers")');
    this.url = "/angularJs-protractor/BankingProject/#/manager/addCust";
    this.openAccountButton = this.page.getByRole('button', {name: 'Open Account'});

  };

  async open() {
    await this.page.goto(this.url)
  };

  async awaitPageLoad() {
    await this.page.waitForURL(this.url);
  }

  async clickAddCustomerButton() {
    await this.addCustomerSubmitButton.click();
  };

  async reload() {
    await this.page.reload();
  };

  async clickCustomersButton() {
    await this.customersButton.click();
  };

  async fillFirstNameField(firstName) {
    await this.firstNameField.fill(firstName);
  };

  async fillLastNameField(lastName) {
    await this.lastNameField.fill(lastName);
  };

  async fillPostCodeField(postCode) {
    await this.postalCodeField.fill(postCode);
  };  

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  };
}
