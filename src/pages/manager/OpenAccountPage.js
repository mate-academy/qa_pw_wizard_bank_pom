import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.dropDownCurrencyLocator = page.getByTestId('currency');
    this.dropDownCustomerNameLocator = page.getByTestId('userSelect');
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async reload() {
    await this.page.reload();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

// Currency

  async selectCurrency(currency) {
    await this.dropDownCurrencyLocator.selectOption(currency);
  }

  async assertCurrencyIsValue(value) {
    await expect(this.dropDownCurrencyLocator).toHaveValue(value);
  }

// Customer

  async selectCustomer(firstName, lastName) {
    await this.dropDownCustomerNameLocator.selectOption(`${firstName} ${lastName}`);
  }

}
