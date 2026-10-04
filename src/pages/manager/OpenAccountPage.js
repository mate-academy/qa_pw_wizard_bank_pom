import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropdown = page.locator('select').nth(0);
    this.currencyDropdown = page.locator('select').nth(1);
    this.processButton = page.getByRole('button',  { name: 'Process'});
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(firstName, lastName) {
    const dropdownValue = firstName + ' ' + lastName;

    await this.customerDropdown.selectOption(dropdownValue);
  }

  async selectCurrency(currencyValue) {
    await this.currencyDropdown.selectOption(currencyValue);
  }

  async assertCurrencyValue(currencyValue) {
    await expect(this.currencyDropdown).toHaveValue(currencyValue);
  }

  async clickProcessButton () {
    await this.processButton.click();
  }
}
