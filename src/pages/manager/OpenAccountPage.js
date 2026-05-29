import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator('#currency');
    this.customerDropdown = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async waitForLoadURL() {
    await this.page.waitForURL('**/#/manager/openAccount');
  }

  async reloadPage() {
    await this.page.reload();
  }

  async selectCustomer(customerName) {
    await this.customerDropdown.selectOption({ label: customerName });
  }

  async clickProcess() {
    await this.processButton.click();
  }

  async selectCurrencyDollar() {
    await this.currencyDropdown.selectOption({ label: 'Dollar' });
  }

  async assertDropdownHasValueDollar() {
    await expect(this.currencyDropdown).toHaveValue('Dollar');
  }

  async selectCurrencyPound() {
    await this.currencyDropdown.selectOption({ label: 'Pound' });
  }

  async assertDropdownHasValuePound() {
    await expect(this.currencyDropdown).toHaveValue('Pound');
  }

  async selectCurrencyRupee() {
    await this.currencyDropdown.selectOption({ label: 'Rupee' });
  }

  async assertDropdownHasValueRupee() {
    await expect(this.currencyDropdown).toHaveValue('Rupee');
  }

}