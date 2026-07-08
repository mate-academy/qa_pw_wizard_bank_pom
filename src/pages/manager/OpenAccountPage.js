import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.getByTestId('userSelect');
    this.currencySelect = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reload() {
    await this.page.reload();
  }

  async selectCustomer(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    await this.customerSelect.selectOption({ label: fullName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async assertCurrencyIs(expectedCurrency) {
    const selectedOption = this.currencySelect.locator('option:checked');
    await expect(selectedOption).toHaveText(expectedCurrency);
  }

  async process() {
    await this.processButton.click();
  }
}
