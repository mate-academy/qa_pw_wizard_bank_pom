const { expect } = require('@playwright/test');

class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processBtn = page.locator('button[type="submit"]');
  }

  async selectCustomer(customerName) {
    await this.customerSelect.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async processAccount() {
    await this.processBtn.click();
  }
}

module.exports = { OpenAccountPage };