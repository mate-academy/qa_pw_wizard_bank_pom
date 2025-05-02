const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page; 
    this.currency = page.getByTestId('currency');
    this.customer = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.lastRow = page.locator('table tbody tr').last();
    this.tableBody = page.locator('table tbody');
    
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCurreencyDollar() {
    await this.currency.selectOption('Dollar');
  }

  async currencyDropDawnContainDollar() {
    await expect(this.currency).toContainText('Dollar');
  }

  async selectCurreencyPound() {
    await this.currency.selectOption('Pound');
  }

  async currencyDropDawnContainPound() {
    await expect(this.currency).toContainText('Pound');
  }

  async selectCurreencyRupee() {
    await this.currency.selectOption('Pound');
  }

  async currencyDropDawnContainRupee() {
    await expect(this.currency).toContainText('Rupee');
  }

  async selectLastCreatedCustomer() {
    const lastCreatedCustomer = await this.customer.locator('option').last();
    const value = await lastCreatedCustomer.getAttribute('value');
    await this.customer.selectOption(value);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async visibleLastAccountNumber() {
    const lastRowAccountNumber = this.lastRow.locator('td').last();
    await expect(lastRowAccountNumber).toBeVisible();
  }
}