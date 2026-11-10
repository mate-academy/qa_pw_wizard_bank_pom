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

  async reloadPage() {
    await this.page.reload();
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
  }

  async selectCustomer(firstName, lastName) {
    await this.customerDropdown.selectOption(`${firstName} ${lastName}`);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertCurrencyIsSelected(currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }
}
