import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.getByTestId('currency');
    this.customerDropdown = page.getByTestId('userSelect');

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');

  
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
  }

  async assertCurrencyIsSelected(currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }

  async selectCustomer(customerName) {
    await this.customerDropdown.selectOption({ label: customerName });
  }
  
  async assertCustomerIsSelected(customerName) {
    await expect(this.customerDropdown).toHaveValue(customerName);
  }

  async process() {
    await this.page.getByRole('button', { name: 'Process' }).click();
  }

  async openCustomers() {
    await this.page.getByRole('button', { name: 'Customers' }).click();
  }


  async reloadPage() {
    await this.page.reload();
  }



}