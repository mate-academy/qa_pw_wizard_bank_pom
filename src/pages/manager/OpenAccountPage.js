import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.getByTestId('currency');
    this.customerDropDown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process'});
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount',);
  }
  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption(currency);
  }
  async reload() {
    await this.page.reload();
  }
  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption(customerName);
  }
  async clickProcessButton() {
    await this.processButton.click();
  }
  async assertCurrencyDropDownHasValue(currency) {
    await expect(this.currencyDropDown).toHaveValue(currency);
  }
}
