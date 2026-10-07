import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.locator('select#userSelect');
    this.currencyDropDown = page.locator('select#currency');
    this.dollarOption = this.currencyDropDown.getByRole('option', { name: 'Dollar' });
    this.poundOption = this.currencyDropDown.getByRole('option', { name: 'Pound' });
    this.rupeeOption = this.currencyDropDown.getByRole('option', { name: 'Rupee' });
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption({ label: customerName });
  }

  async selectCurrency(value) {
    await this.currencyDropDown.selectOption(value);
  }

  async clickProcessButton() {
    const accountNumberPromise = new Promise((resolve) => {
      this.page.once('dialog', (dialog) => {
        const match = dialog.message().match(/(\d+)\s*$/);
        dialog.accept();
        resolve(match ? match[1] : '');
      });
    });
    await this.processButton.click();
    return accountNumberPromise;
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
  async assertCurrencyDropDownHasValue(value) {
    await expect(this.currencyDropDown).toHaveValue(value);
  }
}
