const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page
      .locator('#currency');
    this.customerSelect = page
      .getByTestId('userSelect');
    this.progressButton = page
      .getByRole('button', { name: 'Process' });
    this.customersHeadButton = page
      .getByRole('button', { name: 'Customers' });
    this.lastCustomerRow = page
      .locator('tbody > tr').last();
  }

  async open() {
    await this.page
      .goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }
  async selectCurrDollar() {
    await this.currencySelect.selectOption('Dollar');
  }
  async assertCurrencyDollarChoised() {
    expect(await this.currencySelect.inputValue())
      .toBe('Dollar');
  }
  async selectCurrPound() {
    await this.currencySelect.selectOption('Pound');
  }
  async assertCurrencyPoundChoised() {
    expect(await this.currencySelect.inputValue())
      .toBe('Pound');
  }
  async selectCurrRupee() {
    await this.currencySelect.selectOption('Rupee');
  }
  async assertCurrencyRupeeChoised() {
    expect(await this.currencySelect.inputValue())
      .toBe('Rupee');
  }
  async selectCustomer(firstName, lastName) {
    await this.customerSelect
      .selectOption({ label: `${firstName} ${lastName}` });
  }
  async clickProgressButton() {
    await this.progressButton.click();
  }
  async reloadPage() {
    await this.page.reload();
  }
  async clickCustomersHeadButton() {
    await this.customersHeadButton.click();
  }
  async assertIdCellIsNotEmpty() {
    await expect(this.lastCustomerRow.locator('td:nth-child(4)'))
      .not.toBeEmpty();
  }
}