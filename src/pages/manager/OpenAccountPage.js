import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.locator('select').nth(1);
    this.customerDropDown = page.locator('select').nth(0);
    this.processButton = page.getByRole('button', { name: 'Process'});
    this.customersButton = page.getByRole('button', { name: 'Customers'});
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

  async selectNeededCustomer(fullName) {
    await this.customerDropDown.selectOption({ label: fullName });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async reloadThePage() {
    //await this.page.reload();
    await this.page.on('dialog', dialog => dialog.accept());
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
