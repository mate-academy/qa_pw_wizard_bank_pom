import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.getByTestId('userSelect');
    this.currencyDropDown = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async reload() {
    await this.page.reload();
  }

  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption({ label: currency });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertCurrencyDropDownHasValue(currency) {
    await expect(
      this.currencyDropDown.locator('option:checked'),
    ).toHaveText(currency);
  }
}
