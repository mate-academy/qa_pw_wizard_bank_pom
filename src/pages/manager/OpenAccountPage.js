import { expect } from '@playwright/test';
import { BankManagerMainPage } from './BankManagerMainPage';

export class OpenAccountPage extends BankManagerMainPage {
  constructor(page) {
    super(page);
    this.customerDropdownField = page.getByTestId('userSelect');
    this.currencyDropdownField = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    const currencyNameFormated = currency.charAt(0).toUpperCase() + currency.toLowerCase().slice(1);
    await this.currencyDropdownField.selectOption(currencyNameFormated);
  }

  async assertCurrencyDropdownValue(expectedValue) {
    const currentValue = await this.currencyDropdownField.inputValue();
    expect(currentValue.toLowerCase()).toBe(expectedValue.toLowerCase());
  }

  async selectCustmerFromDropdown(firstName, lastName) {
    await this.customerDropdownField.selectOption(`${firstName} ${lastName}`);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
