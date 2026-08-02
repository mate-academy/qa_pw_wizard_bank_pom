import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDownLocator = page.getByTestId('currency');
    this.userDropDownLocator = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' })
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async selectCurrency(currency) {
    await this.currencyDropDownLocator.selectOption(currency);
  }

  async selectUser(firstName,lastName) {
    await this.userDropDownLocator.selectOption({ label: `${firstName} ${lastName}` });
  }

  async assertCurrency(currency) {
    await expect(this.currencyDropDownLocator).toHaveValue(currency);
  }

}
