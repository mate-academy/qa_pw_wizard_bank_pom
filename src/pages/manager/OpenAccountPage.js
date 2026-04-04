import { expect } from '@playwright/test';

export class OpenCustomerPage {
  constructor(page) {
    this.page = page;
    this.currencyOption = page.getByTestId('currency');
    this.customerNameOption = page.getByTestId('userSelect');
    this.buttonProcess = page.getByRole('button', { name: 'Process' });
    this.buttonCustomers = page.getByRole('button', { name: 'Customers' });
  } 

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reloadPage() {
    await this.page.reload();
  }

  async selectCurrencyOption (currency) {
    await this.currencyOption.selectOption(currency);
  }

  async assertCurrencyOptionDollar(text) {
    expect (this.currencyOption).toHaveValue(text);
  }

  async selectCustomerNameOption() {
    const lastOption = this.customerNameOption.locator('option:last-child');
    const value = await lastOption.getAttribute('value');
    await this.customerNameOption.selectOption(value);
  }
  
  async clickButtonProcess() {
    await this.buttonProcess.click();
  }

  async clickButtonCustomers() {
    await this.buttonCustomers.click();
  }

}
