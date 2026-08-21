import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersTab = page.getByRole('button', { name: 'Customers' });
    this.currencySelect = page.getByTestId('currency');
  }



  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async assertCurrencyValue(currency) {
    await expect(this.currencySelect).toHaveValue(currency);
  }

  async selectCustomer(customerName) {
    await this.customerSelect.selectOption({ label: customerName });
  }   

  async clickProcessButton() {
    await this.processButton.click();
  }
  async clickCustomersTab() {
    await this.customersTab.click();
  }  
  async reloadPage() {
    await this.page.reload();
  }
  async setDollarCurrency() {
    await page.getByTestId('currency').selectOption('Dollar').click();
  }

}
