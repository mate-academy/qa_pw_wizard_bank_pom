import { expect } from '@playwright/test';

export class OpenAccountPage{
  constructor(page) {
    this.page = page;
    this.currencySelect = page.getByTestId('currency');
    this.userSelect = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async expectSelectedCurrency(currency) {
    await expect(this.currencySelect).toHaveValue(currency);
  }

  async selectUser(customerFullName) {
      await this.userSelect.selectOption(customerFullName);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
