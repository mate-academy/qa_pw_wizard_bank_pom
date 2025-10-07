import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customerName = page.locator('#userSelect');
    this.customersButton = page.getByRole('button', { name: 'Customers' });

  }

  async open() {
    await this.page.goto(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async assertCurrencySelected(expectedCurrency) {
    await expect(this.currencySelect).toHaveValue(expectedCurrency);
  }

  async clickProcess() {
    await this.processButton.click();
  }

  async selectCustomer(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    await this.customerName.selectOption({ label: fullName });
  }

  async clickCustomers() {
    await this.customersButton.click();
  }

  async reloadPage() {
    await this.page.reload();
  }
}

