import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.getByRole('combobox').nth(1);
    this.customerDropDown = page.getByRole('combobox').nth(0);
    this.processButton = page.getByRole('button', { name: 'Process'});
    this.customersButton = page.getByRole('button', { name: 'Customers'});
    this.comboxList = page.getByRole('MenuListPopup').nth(0);

    this.neededCustomer = page.locator('select').nth(0);
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async waitForLoading() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCurrencyDropDown(value) {
    await this.currencyDropDown.selectOption(value);
  }

  async checkCurrencyDropDown(value) {
    await expect(this.currencyDropDown).toHaveValue(value);
  }

  async selectCustomerDropDown() {
    await this.customerDropDown.click();
  }

  async selectNeededCustomer(fullName) {
    await this.neededCustomer.selectOption({ label: fullName });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async reloadThePage() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
