const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator('#currency')
    this.customerDropdown = page.locator('#userSelect')
    this.processButton = page.getByRole('button', {name: 'Process'})
    this.customersButton = page.getByRole('button', {name: 'Customers'})
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reloadPage() {
    await this.page.reload();
  }

  async selectValueFromCurrencyDropdown(value) {
    await this.currencyDropdown.selectOption(value);
  }

  async assertCurrencyDropdownHasCertainValue(value) {
    await expect(this.currencyDropdown).toHaveValue(value)
  }

  async selectJustCreatedCustomer(firstName, lastName) {
    const createdCustomer = `${firstName} ${lastName}`;
    await this.customerDropdown.selectOption(createdCustomer);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertAccountNumberOfCustomerIsNotEmpty() {
    const lastRowAddedCustomer = this.page.getByRole('row').last();
    const accountNumberCellOfLastRow = lastRowAddedCustomer.getByRole('cell').nth(3);

    await expect(accountNumberCellOfLastRow).not.toHaveText('');
  }
}
