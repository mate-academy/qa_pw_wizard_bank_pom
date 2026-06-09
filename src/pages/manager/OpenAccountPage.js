import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator('#currency');
    this.customerDropdown = page.locator('#userSelect');
    this.processButton = page.locator('button', { hasText: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectDollarCurrency() {
    await this.currencyDropdown.selectOption('Dollar');
  }

  async selectPoundCurrency() {
    await this.currencyDropdown.selectOption('Pound');
  }

  async selectRupeeCurrency() {
    await this.currencyDropdown.selectOption('Rupee');
  }

  async assertDollarCurrency() {
    await expect(this.currencyDropdown).toHaveValue('Dollar');
  }

  async assertPoundCurrency() {
    await expect(this.currencyDropdown).toHaveValue('Pound');
  }

  async assertRupeeCurrency() {
    await expect(this.currencyDropdown).toHaveValue('Rupee');
  }

  async selectLastCustomer() {
    const options = this.customerDropdown.locator('option');
    await expect.poll(async () => options.count()).toBeGreaterThan(1);
    const lastIndex = await options.count() - 1;
    await this.customerDropdown.selectOption({ index: lastIndex });
  }

  async clickProcess() {
    await this.processButton.click();
  }
}
