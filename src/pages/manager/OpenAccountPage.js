import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelector = page.getByTestId('currency');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrencyValue(value){
    await this.currencySelector.selectOption(value);
  }

  async assertDropDownValue(value){
    await expect(this.currencySelector).toContainText(value);
  }
}
