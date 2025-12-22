import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.getByTestId('currency');
    this.customerNameDropdown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }


    async reload() {
    await this.page.reload();
  }
  

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
  }

    async assertSelectedCurrency(currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }

  async selectLastAddedCustomerName() {
  const lastOption = this.customerNameDropdown.locator('option').last();
  const value = await lastOption.getAttribute('value');
  await this.customerNameDropdown.selectOption(value);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
  }

