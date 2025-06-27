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

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption({ label: currency });
  }

  async assertCurrencyDropdownHaveValue(currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }

  async selectCustomer(firstName, lastName) {
  const fullName = `${firstName} ${lastName}`;
  await this.customerDropdown.selectOption({ label: fullName });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
