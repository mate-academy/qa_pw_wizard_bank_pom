import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator('#currency');
    this.userDropdown = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reload() {
    await this.page.reload();
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
  }

  async assertSelectedCurrency(currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }

  async selectCustomer(customerName) {
    await this.userDropdown.selectOption({ label: customerName });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
