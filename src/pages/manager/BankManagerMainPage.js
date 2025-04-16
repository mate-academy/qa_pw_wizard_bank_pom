const { expect } = require('@playwright/test');

class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerBtn = page.locator('button[ng-click="addCust()"]');
    this.openAccountBtn = page.locator('button[ng-click="openAccount()"]');
    this.customersBtn = page.locator('button[ng-click="showCust()"]');
  }

  // Для всіх тестів
  async verifyManagerPageLoaded() {
    await expect(this.addCustomerBtn).toBeVisible();
    await expect(this.openAccountBtn).toBeVisible();
    await expect(this.customersBtn).toBeVisible();
  }

  async clickAddCustomerTab() {
    await this.addCustomerBtn.click();
    await this.page.waitForURL(/addCust$/);
  }

  async clickOpenAccountTab() {
    await this.openAccountBtn.click();
    await this.page.waitForURL(/openAccount$/);
  }

  async clickCustomersTab() {
    await this.customersBtn.click();
    await this.page.waitForURL(/list$/);
  }
}

module.exports = { BankManagerMainPage };