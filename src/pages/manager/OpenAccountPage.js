import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator('#currency');
    this.customerDropdown = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currencyName) {
    await this.currencyDropdown.selectOption(currencyName);
  }

  async selectCustomer(fullName) {
    await this.customerDropdown.selectOption({ label: fullName });
  }

  async clickProcess() {
    await this.processButton.click();
  }

  async reloadPage() {
    await this.page.reload();
  }
}
