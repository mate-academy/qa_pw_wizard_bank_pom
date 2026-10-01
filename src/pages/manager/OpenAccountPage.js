import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.getByTestId('currency');
    this.customerDropDown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerFullName) {
  await this.customerDropDown.selectOption({ label: customerFullName });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async reload() {
    await this.page.reload();
  }

  async selectCurrency(currencyName){
    await this.currencyDropDown.selectOption(currencyName);
  }

  async assertCurrencyDropDownHasValue(value) {
    await expect(this.currencyDropDown).toHaveValue(value);
  }

  async assertCustomerDropDownIsInvalid() {
    await expect(this.customerDropDown).toHaveClass(/ng-invalid-required/);
  }
}
