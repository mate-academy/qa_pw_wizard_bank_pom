import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.locator('select[id="userSelect"]');
    this.currencyDropDown = page.locator('select[id="currency"]');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertCurrencyDropDownHasValue(value) {
    await expect(this.currencyDropDown).toHaveValue(value);
  }
}