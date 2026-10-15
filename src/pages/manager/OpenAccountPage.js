import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.getByRole('combobox').first();
    this.currencySelect = page.getByRole('combobox').last();
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.successMessage = page.getByText('Account created successfully');
  }

  async open() {
    await this.page.goto(
  '/angularJs-protractor/BankingProject/#/manager/addAccount',
  { waitUntil: 'domcontentloaded' },
);
  }

  async selectCustomer(fullName) {
    await this.customerSelect.selectOption({ label: fullName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertAccountCreatedSuccessfully() {
    await expect(this.successMessage).toBeVisible();
  }
}