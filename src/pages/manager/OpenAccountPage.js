
import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;

    this.customerDropdown = page.locator('#userSelect');
    this.currencyDropdown = page.locator('#currency');

    this.processButton = page.getByRole('form').getByRole('button', {
      name: 'Process',
    });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerName) {
    await this.customerDropdown.selectOption({
      label: customerName,
    });
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption({
      label: currency,
    });
  }

  async clickProcessButton() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await this.processButton.click();
  }

  async assertCurrencyDropdownHasValue(currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }

  async assertCustomerDropdownIsVisible() {
    await expect(this.customerDropdown).toBeVisible();
  }

  async assertCurrencyDropdownIsVisible() {
    await expect(this.currencyDropdown).toBeVisible();
  }
}
