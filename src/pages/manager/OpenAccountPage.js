import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('select#userSelect');
    this.currencySelect = page.locator('select#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerName) {
    await this.customerSelect.selectOption({ label: customerName });
  }

  async selectCurrency(currencyName) {
    await this.currencySelect.selectOption({ label: currencyName });
  }

  async clickProcessButton() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertCurrencyHasValue(value) {
    await expect(this.currencySelect).toHaveValue(value);
  }
}
