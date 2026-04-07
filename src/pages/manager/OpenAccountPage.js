import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.locator('#userSelect');
    this.currencyDropDown = page.locator('#currency');
    this.processButton = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerFullName) {
    if (!customerFullName) return;
    await this.customerDropDown.selectOption({ label: customerFullName });
  }

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption({ label: currency });
  }

  async clickProcessButton() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await this.processButton.click();
  }

  async assertCurrencyDropDownHasValue(expectedCurrency) {
    const selectedValue = await this.currencyDropDown.evaluate(
      (el) => el.options[el.selectedIndex].text,
    );
    expect(selectedValue).toBe(expectedCurrency);
  }
}
