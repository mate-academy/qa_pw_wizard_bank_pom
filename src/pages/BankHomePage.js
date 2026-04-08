import { expect } from "@playwright/test";

export class BankHomePage {
  constructor(page) {
    this.page = page;

    this.customerLoginBtn = page.locator('button:has-text("Customer Login")');

    this.bankManagerLoginBtn = page.locator(
      'button:has-text("Bank Manager Login")',
    );
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/login");
  }

  async clickBankManagerLogin() {
    await this.bankManagerLoginBtn.click();
  }
}
