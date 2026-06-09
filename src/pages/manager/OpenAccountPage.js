import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.locator('#currency');
    this.customerDropDown = page.locator('#userSelect');
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

  async selectCurrency(currencyName) {
    await this.currencyDropDown.selectOption(currencyName);
  }

  async assertCurrencyHasValue(value) {
  await expect(this.currencyDropDown).toHaveValue(value);
  }

  async selectLastCustomer() {
    const lastOption = this.customerDropDown.locator('option').last();
    const value = await lastOption.getAttribute('value');
    await this.customerDropDown.selectOption(value);
}

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
