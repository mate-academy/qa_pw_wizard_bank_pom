import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.locator('select[ng-model="currency"]');
    this.customerDropDown = page.locator('select[ng-model="custId"]');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption(currency);
  }

  async assertSelectedCurrencyIs(currency) {
    await expect(this.currencyDropDown).toHaveValue(currency);
  }

  async selectCustomer(fullName) {
  await this.customerDropDown.selectOption({ label: fullName });
}

async clickProcessButton() {
    await this.processButton.click();
  }

}
