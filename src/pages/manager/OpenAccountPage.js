import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.locator('select[ng-model="custId"]');
    this.currencyDropDown = page.locator('select[ng-model="currency"]');
    this.processButton = page.getByRole('form').getByRole('button', {
      name: 'Process',
    });
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
    await this.currencyDropDown.selectOption({ label: currency });
  }

  async assertCurrencyHasValue(currency) {
    await expect(this.currencyDropDown).toHaveValue(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
