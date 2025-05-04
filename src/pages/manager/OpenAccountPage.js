const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page; 
    this.currencyOption = page.getByTestId('currency');
    this.userOption = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectUser(firstName, lastName) {
    await this.userOption.selectOption(`${firstName} ${lastName}`);
  }

  async selectDollar() {
    await this.currencyOption.selectOption('Dollar')
  }

  async checkSelectDollar() {
    await expect(this.currencyOption).toContainText('Dollar');
  }

  async selectPound() {
    await this.currencyOption.selectOption('Pound')
  }

  async checkSelectPound() {
    await expect(this.currencyOption).toContainText('Pound');
  }

  async selectRupee() {
    await this.currencyOption.selectOption('Rupee')
  }

  async checkSelectRupee() {
    await expect(this.currencyOption).toContainText('Rupee');
  }

  async processButtonClick() {
    await this.processButton.click();
  }
}