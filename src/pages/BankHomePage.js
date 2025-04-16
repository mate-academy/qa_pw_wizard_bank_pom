const { expect } = require('@playwright/test');

class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginBtn = page.locator('button[ng-click="customer()"]');
    this.managerLoginBtn = page.locator('button[ng-click="manager()"]');
    this.homeBtn = page.locator('button.home');
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  }

  async navigateToManagerLogin() {
    await this.managerLoginBtn.click();
  }
}

module.exports = { BankHomePage };  // Експорт для CommonJS