import { expect } from "@playwright/test";
export class OpenAccountPage {
  constructor(page) {
    this.page = page;

    this.customerSelect = page.locator("#userSelect");
    this.currencySelect = page.locator("#currency");
    this.processBtn = page.locator('button[type="submit"]:has-text("Process")');
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/openAccount",
    );
  }

  async selectCustomer(fullName) {
    await this.customerSelect.selectOption({ label: fullName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ value: currency });
  }

  async clickProcess() {
    await this.processBtn.click();
  }
}
