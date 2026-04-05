import { expect } from "@playwright/test";

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;

    this.addCustomerBtn = page.locator('button[ng-click="addCust()"]');
    this.openAccountBtn = page.locator('button[ng-click="openAccount()"]');
    this.customersBtn = page.locator('button[ng-click="showCust()"]');
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager");
  }

  async clickCustomersTab() {
    await this.customersBtn.click();
  }
}
