import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.locator("#currency");
    this.customerDropDown = page.locator("#userSelect");
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async waitForCustomersURL() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption(currency);
  }

  async selectCustomer(firstName, lastName) {
    await this.customerDropDown.selectOption({label: `${firstName} ${lastName}`});
}

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertCurrency(currency) {
    await expect(this.currencyDropDown).toHaveValue(currency);
  }

  async assertValidationMessageForCustomerNotSelected() {
    await expect(this.customerDropDown).toHaveJSProperty("validationMessage","Please select an item in the list.");
  }
}
