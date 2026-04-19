import { expect } from "@playwright/test";

export class OpenAccountPage { 
  constructor(page) {
    this.page = page;
    this.option = page.locator("#currency");
    
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  async selectCurrency (currency) {
    await this.option.selectOption(currency);
await expect(this.option).toHaveValue(currency);  }
}