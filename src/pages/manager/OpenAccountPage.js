import { expect } from '@playwright/test';
import { BankManagerMainPage } from './BankManagerMainPage';

export class OpenAccountPage extends BankManagerMainPage {
  static URL = '/angularJs-protractor/BankingProject/#/manager/openAccount';
  
  constructor(page) {
    super(page);

    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.addButton = page.getByRole('form').getByRole('button', { name: 'Process'});
  }

  /**
   * @param {string} customer 
   */
  async selectCustomer(customer) {
    await this.customerSelect.selectOption(customer);
  }

  /**
   * @param {string} customer 
   */
  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async addAccount() {
    await this.addButton.click();
  }

  async assertCurrencySelected(currency) {
    await expect(this.currencySelect).toContainText(currency);
  }

  async assertCustomerSelected(customer) {
    await expect(this.customerSelect).toContainText(customer);
  }
}
