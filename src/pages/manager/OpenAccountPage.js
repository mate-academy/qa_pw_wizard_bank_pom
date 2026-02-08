import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropdown = this.page.locator('#userSelect');
    this.currencyDropdown = this.page.locator('#currency');
    this.processButton = this.page.getByRole('button', {name: "Process"});
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
  };

  async assertCurrencyDropdawnHasvalue(value) {
    await expect(this.currencyDropdown).toHaveValue(value);
  };

  async selectCustomer(customer) {
    await this.customerDropdown.selectOption(customer);
  };

  async clickProcessButton() {
    await this.processButton.click();
  }
}
