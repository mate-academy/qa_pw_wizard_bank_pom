import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;

    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCustomer(name) {
    await this.customerSelect.selectOption({ label: name });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async clickProcess() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.processButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message; 
  }

  async reloadPage() {
    await this.page.reload();
  }

  async assertSelectedCurrency(currency) {
    await expect(this.currencySelect).toHaveValue(currency);
  }
}



