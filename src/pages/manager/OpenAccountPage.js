import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' }); 
    this.customerSelect = page.locator('#userSelect');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currencyName) {
    await this.currencySelect.selectOption(currencyName);
  }

  async assertSelectedCurrencyIs(expectedCurrency) {
    await expect(this.currencySelect).toHaveValue(expectedCurrency);
  }

  async selectCustomerByName(fullName) {
    await this.customerSelect.selectOption(fullName);
  }
  
  async clickProcessButton() {
    await this.processButton.click();
  }

  async reload() {
  await this.page.reload();
  }
  }
